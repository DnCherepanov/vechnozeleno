const EasyYandexS3 = require('easy-yandex-s3')

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: '4rKcCq0NwV66SigUwkB1',
    secretAccessKey: 'koRiYKnFKbSrJ409Hz_lDO9Lkyad8ZJdCGbaLob0',
  },
  Bucket: 'pourtoi', // Название бакета
  debug: true, // Дебаг в консоли
})

module.exports.coverAndMedia = async (req, res, next) => {
  try {
    const sizes = [800, 400, 250]
    const cover = req.body.cover.replace(/^.+net/g, '')
    const media = req.body.media.map((item) => item.replace(/^.+net/g, ''))
    await sizes.forEach(async (size) => {
      await s3.Remove(`${cover}-${size}`)
    })
    await media.forEach(async (item) => {
      for (let i = 0; i < sizes.length; ++i) {
        await s3.Remove(`${item}-${sizes[i]}`)
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  next()
}
