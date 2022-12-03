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
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="customer.phone"
                type="tel"
                placeholder="8xxxxxxxxxx"
                pattern="(8)\d{10}"
                required
                validation-message="Введите телефон в формате 8xxxxxxxxxx"
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
        this.$buefy.snackbar.open({
          message: 'Заказ оформлен',
          actionText: '',
        })
      } catch (error) {
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
