const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  status: {
    type: String,
    default: 'Новый',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  customer: {
    firstName: { type: String, required: [true, 'Введите свое имя'] },
    lastName: { type: String, required: [true, 'Введите свою фамилию'] },
    phone: {
      type: String,
      validate: {
        // eslint-disable-next-line object-shorthand
        validator: function (v) {
          return /^(\+7)[\s]\([0-9]{3}\)[\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/.test(
            v
          )
        },
        message: (props) => `${props.value} некорректный номер телефона`,
      },
      required: [true, 'Введите номер телефона'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        // eslint-disable-next-line object-shorthand
        validator: function (v) {
          // eslint-disable-next-line security/detect-unsafe-regex
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: (props) => `${props.value} некорректная почта`,
      },
      required: [true, 'Введите свою почту'],
    },
  },
  cart: {
    type: Array,
  },
  delivery: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
  },
})

module.exports = model('orders', orderSchema)
