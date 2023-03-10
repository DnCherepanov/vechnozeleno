const EasyYandexS3 = require('easy-yandex-s3')

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  Bucket: process.env.S3_BUCKET, // Название бакета
  debug: false, // Дебаг в консоли
})

module.exports.images = async (req, res, next) => {
  const sizesProduct = [800, 400, 250]
  const sizesArticle = [1400, 500]

  if (req.body.cover) {
    const cover = req.body.cover.replace(/^.+net/g, '')
    for (const size of sizesProduct) {
      await s3.Remove(`${cover}-${size}`)
    }
  }

  if (req.body.photo) {
    const photo = req.body.photo.replace(/^.+net/g, '')
    for (const size of sizesArticle) {
      await s3.Remove(`${photo}-${size}`)
    }
  }

  if (req.body.media) {
    const media = req.body.media.map((item) => item.replace(/^.+net/g, ''))
    for (const item of media) {
      for (const size of sizesProduct) {
        await s3.Remove(`${item}-${size}`)
      }
    }
  }
  next()
}
