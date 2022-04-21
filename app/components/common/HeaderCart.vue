<template>
  <div class="navbar__cart">
    <b-dropdown aria-role="list" append-to-body position="is-bottom-left">
      <template #trigger>
        <a role="button" aria-label="Корзина">
          <b-icon icon="shopping-bag-line" />
        </a>
        <span class="badge" :class="{ animate__pulse: isAnimated }">{{
          products.length
        }}</span>
      </template>
      <b-dropdown-item v-if="!products.length" :focusable="false" custom>
        <b-image
          class="no-image my-4"
          src="/noImage.png"
          webp-fallback=".png"
        />
        <p class="subtitle is-5 has-text-centered">Ваша корзина пуста</p>
      </b-dropdown-item>
      <b-dropdown-item
        v-for="product of products"
        :id="product.id"
        :key="product.id"
        :focusable="false"
        has-link
        paddingless
        aria-role="menuitem"
      >
        <article class="media is-vcentered p-3">
          <figure class="media-left">
            <NuxtLink class="p-0" :to="`/catalog/product/${product.id}`">
              <div class="image is-64x64">
                <b-image
                  :src="`${product.cover}-250`"
                  src-fallback="/products/default-cover.svg"
                  alt="Фотография товара"
                  ratio="1by1"
                />
              </div>
            </NuxtLink>
          </figure>
          <div class="media-content is-vcentered">
            <NuxtLink class="p-0" :to="`/catalog/product/${product.id}`">
              <div class="content">
                <p>
                  <strong>
                    {{ product.price }} &#8381; x
                    {{ product.quantity }}
                  </strong>
                  <br />

                  {{ product.title }}
                </p>
              </div>
            </NuxtLink>
          </div>
          <div class="media-right">
            <a role="button" class="p-0" @click="deleteItem(product.id)">
              <b-icon icon="delete-bin-line" size="is-small" />
            </a>
          </div>
        </article>
      </b-dropdown-item>
      <div v-show="products.length" class="px-3">
        <hr />
        <p class="subtitle is-5">Итого: {{ total }} &#8381;</p>
      </div>
      <b-dropdown-item
        v-show="products.length"
        class="pt-0 p-3"
        :focusable="false"
        paddingless
        aria-role="listitem"
      >
        <b-button
          tag="nuxt-link"
          to="/cart"
          type="is-dark"
          class="mt-4"
          expanded
          @click="active - change(!active)"
        >
          Перейти в корзину
        </b-button>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return { isAnimated: false }
  },
  computed: {
    ...mapState({
      products: (state) => state.cart.items,
    }),
    ...mapGetters('cart', {
      total: 'cartTotalPrice',
    }),
  },
  watch: {
    products() {
      this.isAnimated = true
      setTimeout(() => (this.isAnimated = false), 2000)
    },
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch('cart/deleteItem', id)
    },
  },
}
</script>

<style lang="scss" scoped>
a.dropdown-item:hover,
.dropdown .dropdown-menu .has-link a:hover,
button.dropdown-item:hover {
  background: none;
}
.no-image {
  max-width: 80px;
  margin: auto;
}
.dropdown .dropdown-menu .has-link a {
  white-space: normal;
}
</style>
