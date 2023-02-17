<template>
  <section class="section has-background-light mb-6">
    <div class="container">
      <div class="columns">
        <div class="column is-5">
          <div class="block">
            <h2 class="title is-4">Выберите способ доставки:</h2>
            <b-field>
              <b-radio
                v-model="delivery"
                :disabled="freeDelivery"
                native-value="0"
              >
                Самовывоз с пункта выдачи
              </b-radio>
            </b-field>
            <b-field>
              <b-radio
                v-model="delivery"
                :disabled="freeDelivery"
                native-value="300"
              >
                Курьерская доставка по Южно-Сахалинску
                <strong>+ 300 &#8381;</strong>
              </b-radio>
            </b-field>
          </div>
          <div class="block">
            <h2 class="title is-4">Заполните Ваши данные:</h2>
            <b-field>
              <b-input
                v-model="customer.firstName"
                placeholder="Имя"
                type="text"
                required
                pattern="^[А-Яа-яЁё\s]+$"
                validation-message="Введите свое имя на кириллице"
              />
            </b-field>
            <b-field>
              <b-input
                v-model="customer.lastName"
                placeholder="Фамилия"
                type="text"
                required
                pattern="^[А-Яа-яЁё\s]+$"
                validation-message="Введите свою фамилию на кириллице"
              />
            </b-field>
            <b-field>
              <b-input
                v-model="customer.email"
                placeholder="Email"
                type="email"
                icon="mail-line"
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="customer.phone"
                v-cleave="masks.phone"
                type="tel"
                icon="phone-line"
                pattern="^(\+7)[\s]\([0-9]{3}\)[\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$"
                placeholder="+7 (000) 000-00-00"
                validation-message="Введите телефон в формате +7 (000) 000-00-00"
              />
            </b-field>
          </div>
        </div>
        <div class="column is-5 is-offset-2">
          <div class="content has-background-white p-5">
            <h2 class="title is-4">Общая сумма заказа:</h2>
            <div class="level is-mobile">
              <div class="level-left">
                <div class="block">
                  <p class="heading">Товары:</p>
                  <p class="heading">Доставка:</p>
                </div>
              </div>
              <div class="level-right">
                <div class="block">
                  <p class="heading">
                    <strong> {{ cartTotalPrice }} &#8381; </strong>
                  </p>
                  <p class="heading">
                    <strong>
                      {{
                        cartTotalPrice >= 2000
                          ? 'Бесплатно'
                          : `${delivery} &#8381;`
                      }}
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <hr />
            <p>
              <strong>Итого:</strong>
              {{ total }} &#8381;
            </p>
            <b-notification
              :closable="false"
              type="is-success is-light"
              aria-close-label="Close notification"
            >
              <small>
                Для бесплатной доставки необходимо добавить товары на общую
                сумму свыше
                <strong>{{ minTotal }}</strong
                ><i class="mdi mdi-currency-rub" />
              </small>
            </b-notification>
            <b-progress
              :value="cartTotalPrice"
              :max="minTotal"
              type="is-success"
            ></b-progress>
          </div>
          <b-button type="is-dark" expanded outlined @click="onSubmit">
            Оформить заказ
          </b-button>
          <p class="is-size-7 has-text-grey mt-3">
            Нажимая на кнопку, вы даете согласие на обработку персональных
            данных и соглашаетесь c
            <nuxt-link to="/privacy"> политикой конфиденциальности. </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Cleave from 'cleave.js'
const cleave = {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind(el) {
    const input = el.querySelector('input')
    input._vCleave.destroy()
  },
}
export default {
  directives: { cleave },
  data() {
    return {
      delivery: 300,
      minTotal: 2000,
      customer: {
        fristName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      masks: {
        phone: {
          delimiters: [' ', '(', ') ', '-'],
          prefix: '+7',
          blocks: [2, 0, 3, 3, 2, 2],
          noImmediatePrefix: true,
          numericOnly: true,
        },
      },
    }
  },
  computed: {
    ...mapGetters('cart', ['cartTotalPrice']),
    total() {
      return this.cartTotalPrice + parseInt(this.delivery)
    },
    freeDelivery() {
      return this.cartTotalPrice >= this.minTotal
    },
  },
  methods: {
    async onSubmit() {
      try {
        const cart = this.$store.state.cart.items.map((product) => ({
          id: product.id,
          title: product.option
            ? `'${product.title}, ${product.option.label}'`
            : product.title,
          price: product.price,
          quantity: product.quantity,
        }))
        const formData = {
          delivery: this.delivery,
          customer: this.customer,
          total: this.total,
          cart,
        }
        await this.$store.dispatch('order/create', formData)
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        this.$buefy.snackbar.open({
          message: 'Заказ оформлен',
          position: 'is-bottom',
          actionText: '',
        })
      } catch (error) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        this.$buefy.toast.open({
          message: this.$store.state.error,
          position: 'is-top',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
