const Certificate = require('../models/certificate.model')
const mailer = require('../services/mailer')

module.exports.createCertificate = async (req, res) => {
  const certificate = new Certificate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    certificate: req.body.certificate,
  })

  try {
    await certificate.save()
    res.status(201).json(certificate)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.sendForm = async (req, res) => {
  try {
    await mailer.toInfoPourtoi(req.body)
    res.status(201).json()
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
