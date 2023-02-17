<template>
  <main>
    <client-only>
      <div v-if="cartProducts.length > 0">
        <section class="section">
          <div class="container is-main-section">
            <div class="card has-table has-mobile-sort-spaced">
              <div class="card-content">
                <b-table
                  default-sort="title"
                  :data="cartProducts"
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
                    centered
                    width="70px"
                    cell-class="productTable__image"
                  >
                    <div class="image">
                      <NuxtLink :to="`/catalog/product/${props.row.id}`">
                        <b-image
                          :src="`${props.row.cover}-250`"
                          src-fallback="/products/default-cover.svg"
                          alt="Фото товара"
                          ratio="1by1"
                        />
                      </NuxtLink>
                    </div>
                  </b-table-column>
                  <b-table-column
                    v-slot="props"
                    cell-class="productTable__title"
                    field="title"
                  >
                    <NuxtLink :to="`/catalog/product/${props.row.id}`">
                      {{ props.row.title }} <br />
                      <span v-if="props.row.option">
                        {{ props.row.option.label }}</span
                      >
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
              </div>
            </div>
            <b-button type="is-danger" outlined @click="clearCart()">
              Удалить все товары
            </b-button>
          </div>
        </section>
        <order-form />
      </div>
      <section v-else class="hero">
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">Корзина пуста</p>
            <b-button tag="nuxt-link" to="/">Продолжить покупки</b-button>
          </div>
        </div>
      </section>
    </client-only>
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import orderForm from '@/components/cart/orderForm'

export default {
  components: {
    orderForm,
  },
  computed: {
    ...mapState({
      products: (state) => state.cart.items,
    }),
    ...mapGetters('cart', ['cartProducts', 'cartTotalPrice']),
    total() {
      return this.cartTotalPrice + parseInt(this.delivery)
    },
    freeDelivery() {
      return this.cartTotalPrice >= this.minTotal
    },
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch('cart/deleteItem', id)
      this.$buefy.snackbar.open({
        message: 'Товар удален',
        position: 'is-bottom',
        actionText: '',
      })
    },
    clearCart() {
      this.$store.dispatch('cart/clearCart')
      this.$buefy.snackbar.open({
        message: 'Корзина очищена',
        position: 'is-bottom',
        actionText: '',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
}
table.table td .image {
  width: 3.5rem;
  height: 3.5rem;
}
.deleteIcon {
  vertical-align: sub;
  line-height: 0;
}
</style>
