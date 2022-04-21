<template>
  <main>
    <products-filter
      :sort-value.sync="sortBy"
      :checkbox-group.sync="filterBy"
      :categories="category[0].subs"
    />
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
              v-for="product in products"
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
import ProductCard from '@/components/common/ProductCard'
import ProductsFilter from '@/components/common/ProductsFilter'
export default {
  components: {
    ProductCard,
    ProductsFilter,
  },
  data() {
    return {
      column: 'column is-6-mobile is-3-tablet is-3-desktop',
      activeProducts: [],
      sortBy: null,
      filterBy: [],
    }
  },
  async fetch() {
    const products = await this.$axios.$get(
      `/api/category/${this.$route.params.slug}`
    )
    const activeProducts = products.filter((product) => product.isActive)

    this.activeProducts = this.activeProducts.concat(activeProducts)
  },
  head() {
    const { params } = this.$nuxt.context
    return {
      title: `${params.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Каталог товаров онлайн экомаркета Pourtoi',
        },
      ],
    }
  },
  computed: {
    category() {
      const { store, params } = this.$nuxt.context
      const categories = store.getters['category/categories']
      return categories.filter((category) => category.slug === params.slug)
    },
    products() {
      const products = this.activeProducts
      if (this.sortBy === 'priceHigh') {
        products.sort((a, b) => {
          return a.grossPrice - b.grossPrice
        })
      }
      if (this.sortBy === 'priceLow') {
        products.sort((a, b) => {
          return b.grossPrice - a.grossPrice
        })
      }
      if (this.sortBy === 'new') {
        products.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
      }
      const filtered = products.filter((product) =>
        this.filterBy.includes(product.category.slug)
      )
      return this.filterBy.length ? filtered : products
    },
  },
}
</script>
