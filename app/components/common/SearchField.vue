<template>
  <section style="display: flex; flex-direction: column">
    <div
      class="section search-header has-background-light"
      :class="{ active: isActive }"
    >
      <b-field>
        <b-input
          v-model="keyword"
          size="is-large"
          aria-modal="true"
          placeholder="Что будем искать?"
          icon-right="magnify"
          icon-right-clickable
          @icon-right-click="checkName()"
        >
        </b-input>
      </b-field>
    </div>
    <div v-if="products.length > 0" class="section search-body">
      <div
        class="columns is-multiline is-mobile is-variable"
        @click="$emit('close')"
      >
        <product-card
          v-for="product of products"
          :id="product._id"
          :key="product._id"
          :loading="loading"
          :columns="columns"
          :image="product.cover"
          :title="product.title"
          :price="product.grossPrice"
          :discount="product.discount"
        />
      </div>
    </div>
    <div v-else class="hero-body">
      <div class="container has-text-centered">
        <p class="subtitle">Извините, таких товаров у нас нет.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import ProductCard from '@/components/common/ProductCard'
export default {
  components: { ProductCard },
  data() {
    return {
      columns: 'column is-6-mobile is-3-tablet is-3-desktop',
      loading: true,
      isActive: false,
      keyword: '',
      products: [],
    }
  },
  watch: {
    keyword() {
      if (!this.keyword) return
      this.debounceName()
    },
  },
  created() {
    const debounce = (func, wait, immediate) => {
      let timeout
      return () => {
        const context = this
        const args = arguments
        const later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
    this.debounceName = debounce(this.checkName, 1000)
  },
  methods: {
    async checkName() {
      if (this.keyword.length > 0) {
        const { data } = await axios.get('/api/search/', {
          params: {
            search: this.keyword,
          },
        })
        this.products = data
        this.loading = false
        this.isActive = true
      } else {
        this.products = []
        this.isActive = false
      }
    },
  },
}
</script>
<style lang="scss">
.search-form {
  .modal-content {
    max-width: 100% !important;
    max-height: none;
    height: 100%;
  }
  .modal-background {
    background: #fff;
  }
  .search-header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: 0.75s cubic-bezier(0.165, 0.84, 0.44, 1);
    -o-transition: 0.75s cubic-bezier(0.165, 0.84, 0.44, 1);
    -moz-transition: 0.75s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: 0.75s cubic-bezier(0.165, 0.84, 0.44, 1);
    .field {
      width: 100%;
      max-width: 960px;
      input {
        background: none;
        border-width: 0 0 1px 0;
        border-style: solid;
        border-color: rgba(48, 48, 48, 1);
        border-radius: 0;
        box-shadow: none;
      }
      .icon {
        color: black;
      }
    }
  }
  .search-header.active {
    height: 30vh;
  }
}
</style>
