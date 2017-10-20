# s3-my-mov

Small module to convert a .mov to .mp4 and upload it to an s3 bucket.

## Set up

```
# install
npm install -g s3-my-mov

# set up the directory where your movs are
cd directory/with/movs/

# populate aws config (replace the ... with your secrets)
echo AWS_KEY=... >> .env
echo AWS_SECRET=... >> .env
echo AWS_REGION=... >> .env
echo AWS_BUCKET=... >> .env
```

## Usage

```
cd directory/with/movs/

s3-my-mov video1.mov
```

## Disclaimer

This was very quickly hacked together :) Feel free to add something if you find it useful.

## Licence

MIT
