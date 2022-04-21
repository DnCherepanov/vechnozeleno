<template>
  <div style="min-height: calc(100vh - 180px)">
    <hero-bar> {{ heroTitle }} </hero-bar>
    <section v-if="$fetchState.pending" class="section">
      <div class="content has-text-grey has-text-centered">
        <p>Загружаю данные...</p>
      </div>
    </section>
    <section v-else-if="$fetchState.error" class="section">
      <div class="content has-text-grey has-text-centered">
        <p>Произошла ошибка</p>
        <b-button @click="$fetch">Обновить</b-button>
      </div>
    </section>
    <section v-else class="section">
      <div class="container is-max-desktop">
        <form enctype="multipart/form-data" @submit.prevent="onSubmit">
          <b-field>
            <b-radio-button
              v-model="form.status"
              native-value="Новый"
              type="is-info"
            >
              <b-icon icon="bill-line"></b-icon>
              <span>Новый</span>
            </b-radio-button>

            <b-radio-button
              v-model="form.status"
              native-value="В работе"
              type="is-warning"
            >
              <b-icon icon="refresh-line"></b-icon>
              <span>В работе</span>
            </b-radio-button>

            <b-radio-button
              v-model="form.status"
              native-value="Выполнен"
              type="is-success"
            >
              <b-icon icon="check-line"></b-icon>
              <span>Выполнен</span>
            </b-radio-button>
          </b-field>
          <b-field class="pt-2" grouped>
            <b-field label="Имя" expanded>
              <b-input v-model="form.customer.firstName" required />
            </b-field>
            <b-field label="Фамилия" expanded>
              <b-input v-model="form.customer.lastName" required />
            </b-field>
          </b-field>
          <b-field class="pt-2" grouped>
            <b-field label="Телефон" expanded>
              <b-input v-model="form.customer.phone" required />
            </b-field>
            <b-field label="Email" expanded>
              <b-input v-model="form.customer.email" required />
            </b-field>
          </b-field>

          <b-field class="pt-5">
            <b-table
              default-sort="title"
              :data="form.cart"
              class="productTable"
            >
              <b-table-column
                v-slot="props"
                centered
                width="40px"
                custom-key="actions"
                cell-class="productTable__delete"
              >
                <a
                  class="deleteIcon"
                  role="button"
                  @click="deleteItem(props.row.id)"
                >
                  <b-icon icon="delete-bin-line" size="is-small" />
                </a>
              </b-table-column>
              <b-table-column
                v-slot="props"
                cell-class="productTable__title"
                field="title"
              >
                <NuxtLink :to="`/catalog/product/${props.row.id}`">
                  {{ props.row.title }}
                </NuxtLink>
              </b-table-column>
              <b-table-column
                v-slot="props"
                cell-class="productTable__price"
                label="Цена"
                field="price"
              >
                <span> {{ props.row.price }} &#8381; </span>
              </b-table-column>
              <b-table-column
                v-slot="props"
                width="130"
                centered
                cell-class="productTable__quantity"
                label="Количество"
                field="quantity"
              >
                <b-numberinput
                  v-model="props.row.quantity"
                  controls-rounded
                  type="is-light"
                  size="is-small"
                  :editable="false"
                  min="0"
                  :max="props.row.stock"
                />
              </b-table-column>
              <b-table-column
                v-slot="props"
                cell-class="productTable__sum"
                label="Сумма"
              >
                <span>
                  {{ `${props.row.quantity * props.row.price}` }} &#8381;
                </span>
              </b-table-column>
            </b-table>
          </b-field>

          <div class="content pt-5">
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
                    <strong> {{ form.totalPrice }} &#8381; </strong>
                  </p>
                  <p class="heading">
                    <strong> {{ form.delivery }} &#8381; </strong>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <p>
              <strong>Итого:</strong>
              {{ total }} &#8381;
            </p>
          </div>

          <b-field class="pt-2" grouped position="is-centered">
            <p class="control">
              <b-button type="is-dark" rounded native-type="submit">
                Сохранить
              </b-button>
              <b-button
                class="ml-2"
                rounded
                @click.prevent="cancelOrder(form._id)"
              >
                Отменить заказ
              </b-button>
            </p>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/prilavok/HeroBar'
export default {
  components: {
    HeroBar,
  },
  layout: 'prilavok',
  data() {
    return {
      form: {},
    }
  },
  async fetch() {
    const { store, params, error } = this.$nuxt.context
    try {
      const order = await store.dispatch('order/getOrder', params.id)
      this.form = order
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },

  computed: {
    total() {
      return this.form.totalPrice + this.form.totalPrice
    },
    heroTitle() {
      return 'Заказ'
    },
  },
  methods: {
    deleteItem(id) {
      const index = this.form.cart.findIndex((item) => item._id === id)
      this.form.cart.splice(index, 1)
      this.$buefy.snackbar.open({
        message: 'Товар удален',
        actionText: '',
      })
    },
    onSubmit() {
      this.$store.dispatch('order/update', this.form)
      this.$router.go(-1)
      this.$buefy.snackbar.open({
        message: 'Заказ обновлен',
        actionText: '',
      })
    },
    cancelOrder(id) {
      this.$store.dispatch('order/remove', id)
      this.$router.go(-1)
      this.$buefy.snackbar.open({
        message: 'Заказ отменен',
        queue: false,
      })
    },
  },
}
</script>
