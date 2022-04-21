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
          return /(8)\d{10}$/.test(v)
        },
        message: (props) => `${props.value} некорректный нормер телефона`,
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
