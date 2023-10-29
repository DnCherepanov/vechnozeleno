/* eslint-disable no-console */
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const hbs = require('nodemailer-express-handlebars')

// Конфигурация почтового сервера
const defaultConfig = {
  host: process.env.EMAIL_SMTP,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
}

const transporter = nodemailer.createTransport(defaultConfig)
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    defaultLayout: false,
  },
  viewPath: './api/views',
  extName: '.hbs',
}

handlebars.registerHelper('formatDate', function (date) {
  return date.toLocaleDateString()
})
handlebars.registerHelper('sliceOrder', function (order) {
  return order.toString().slice(0, 5)
})

module.exports = {
  toPourtoi: (order) => {
    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
      from: '"Заказы Pourtoi" <donotreply@pourtoi.ru>',
      to: process.env.EMAIL_TO,
      subject: 'Новый заказ',
      template: 'order',
      context: {
        order,
      },
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log(`Order notification sent to orders@pourtoi.ru`)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  toCustomer: (order) => {
    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
      from: '"Заказы Pourtoi" <donotreply@pourtoi.ru>',
      to: `${order.customer.email}`,
      subject: 'Ваш заказ принят',
      template: 'confirmation',
      context: {
        order,
      },
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log(`Order confirmation sent to ${order.customer.email}`)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  toInfoPourtoi: (formData) => {
    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
      from: 'donotreply@pourtoi.ru',
      to: 'info@pourtoi.ru',
      subject: 'Обратная связь Pourtoi',
      template: 'contactUs',
      context: {
        formData,
      },
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log(`Form sent to info@pourtoi.ru`)
      })
      .catch((error) => {
        console.error(error)
      })
  },
}
