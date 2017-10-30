#!/usr/bin/env node

const path = require('path')
const dotenv = require('dotenv')

dotenv.config(path.join(process.cwd(), '.env'))
if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
  console.error('Make sure you add AWS env vars to', path.join(process.cwd(), '.env'))
  process.exit()
}

const input = process.argv[2]
const output = input.replace('.mov', '.mp4')

const ffmpeg = require('fluent-ffmpeg')
const upload = require('../')

// don't need to convert if we've already got an mp4
if (input.match(/\.mp4$/)) {
  return ffmpegReady()
}

ffmpeg(input)
  .on('progress', (info) => {
    console.log('converting to mp4', info)
  })
  .on('end', ffmpegReady)
  .save(output)

function ffmpegReady () {
  console.log('uploading...')
  upload(output)
    .on('error', function (error) {
      console.error(error)
    }).on('part', function (details) {
      console.log(details)
    }).on('uploaded', function (details) {
      console.log(details)
    })
}
