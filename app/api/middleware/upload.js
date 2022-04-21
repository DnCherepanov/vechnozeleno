const stream = require('stream')
const aws = require('aws-sdk')
const multer = require('multer')
const sharp = require('sharp')
const slug = require('slug')
const multerS3 = require('multer-s3-transform')

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const storage = multerS3({
  s3,
  bucket(req, file, cb) {
    const uploadPath =
      process.env.S3_BUCKET + '/products/' + slug(req.body.title)
    cb(null, uploadPath)
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  cacheControl: 'max-age=31536000',
  shouldTransform(req, file, cb) {
    cb(null, /^image/i.test(file.mimetype))
  },
  key(req, file, cb) {
    const filename = Date.now().toString()
    file.originalname = filename
    cb(null, filename)
  },
  transforms: [
    {
      id: 'original',
      key(req, file, cb) {
        const uploadPath = `${file.originalname}-800`
        cb(null, uploadPath)
      },
      transform(req, file, cb) {
        cb(null, new stream.PassThrough())
      },
    },
    {
      id: 'medium',
      key(req, file, cb) {
        const uploadPath = `${file.originalname}-400`
        cb(null, uploadPath)
      },
      transform(req, file, cb) {
        cb(null, sharp().resize(400).jpeg())
      },
    },
    {
      id: 'thumbnail',
      key(req, file, cb) {
        const uploadPath = `${file.originalname}-250`
        cb(null, uploadPath)
      },
      transform(req, file, cb) {
        cb(null, sharp().resize(250).jpeg())
      },
    },
  ],
})

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // allowing only 5 MB files
  },
})
