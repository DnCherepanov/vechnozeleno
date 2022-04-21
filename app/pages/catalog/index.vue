<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile is-variable">
          <template v-if="$fetchState.pending">
            <article v-for="p in 8" :key="p" :class="column">
              <b-skeleton width="100%" height="150px" animated></b-skeleton>
              <b-skeleton width="100%" animated></b-skeleton>
              <b-skeleton width="80%" animated></b-skeleton>
              <b-skeleton width="40%" animated></b-skeleton>
            </article>
          </template>
          <template v-else-if="$fetchState.error">
            <div :error="$fetchState.error" />
          </template>
          <template v-else>
            <product-card
              v-for="product in activeProducts"
              :id="product._id"
              :key="product._id"
              :column="column"
              :image="product.cover"
              :title="product.title"
              :price="product.grossPrice"
              :discount="product.discount"
            />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/common/ProductCard'
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      column: 'column is-6-mobile is-3-tablet is-3-desktop',
      limit: 0,
    }
  },
  async fetch() {
    await this.$store.dispatch('product/getProducts', this.limit)
  },
  head() {
    const title = 'Каталог товаров'
    const description = 'Каталог товаров онлайн экомаркета Pourtoi'
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('product', ['activeProducts']),
  },
}
</script>
