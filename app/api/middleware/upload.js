const EasyYandexS3 = require('easy-yandex-s3')
const multer = require('multer')
const sharp = require('sharp')
const slug = require('slug')

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: '4rKcCq0NwV66SigUwkB1',
    secretAccessKey: 'koRiYKnFKbSrJ409Hz_lDO9Lkyad8ZJdCGbaLob0',
  },
  Bucket: 'pourtoi', // Название бакета
  debug: false, // Дебаг в консоли
})

const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // ограничение до 5 мб
  },
}).fields([
  { name: 'cover', maxCount: 1 },
  { name: 'media', maxCount: 4 },
])

const handleErrors = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.send('Превышено количество файлов.')
      }
    } else if (err) {
      return res.send(err)
    }
    next()
  })
}
const resizeImages = async (req, res, next) => {
  req.body.cover = []
  req.body.media = []
  // Загружаем массивы в бакет
  async function loadToBucket(size, file, filename, type) {
    const folder = slug(req.body.title)
    const resizedImgFilename = `${filename}-${size}`
    const resizedImgBuffer = await sharp(file.buffer)
      .resize(size)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer()
    const upload = await s3.Upload(
      {
        buffer: resizedImgBuffer,
        name: resizedImgFilename,
      },
      `/products/${folder}/`
    )
    if (size === 800) {
      type.push(upload.Location.slice(0, -4))
    }
  }
  // Обрабатываем каждую фотографию в массиве
  const transformItems = (items, arrayName) => {
    return Promise.all(
      (items ?? []).map(async (item) => {
        const filename = Date.now() + Math.round(Math.random() * 1e2)
        await loadToBucket(800, item, filename, arrayName)
        await loadToBucket(400, item, filename, arrayName)
        await loadToBucket(250, item, filename, arrayName)
      })
    )
  }

  await transformItems(req.files.media, req.body.media)
  await transformItems(req.files.cover, req.body.cover)

  next()
}
module.exports = {
  handleErrors,
  resizeImages,
}
