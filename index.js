const AWS = require('aws-sdk')
const fs = require('fs')
const md5 = require('md5')
const path = require('path')

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
})

module.exports = function (filename) {
  const basename = path.basename(filename)
  const filekey = md5(fs.readFileSync(filename))
  const read = fs.createReadStream(filename)

  const s3Stream = require('s3-upload-stream')(new AWS.S3())
  const upload = s3Stream.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: `${filekey}-${basename}`,
    ACL: 'public-read',
    ContentType: 'video/mp4'
  })

  upload.maxPartSize(209715200) // 200 MB
  upload.concurrentParts(5)

  read.pipe(upload)
  return upload
}
