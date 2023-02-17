<template>
  <main>
    <section class="section">
      <bread-crumbs />
      <div class="container">
        <div class="columns is-variable is-5">
          <div class="column is-5">
            <div class="is-relative">
              <b-tag
                v-if="product.discount > 0"
                class="discount"
                type="is-danger is-light"
              >
                &minus;{{ product.discount }}%
              </b-tag>
              <b-carousel
                :autoplay="false"
                indicator-custom
                :indicator-inside="false"
                :arrow="false"
                :repeat="false"
              >
                <b-carousel-item v-for="(item, i) in product.media" :key="i">
                  <b-image
                    :src="`${product.media[i]}-800`"
                    src-fallback="/products/default-cover.svg"
                    :placeholder="`${product.media[i]}-250?blur=10`"
                    ratio="1by1"
                  />
                </b-carousel-item>
                <template #indicators="props">
                  <b-image
                    class="al image"
                    :src="`${product.media[props.i]}-250`"
                    src-fallback="/products/default-cover.svg"
                    :placeholder="`${product.media[props.i]}-250?blur=10`"
                    ratio="1by1"
                  />
                </template>
              </b-carousel>
            </div>
          </div>
          <div class="column is-6">
            <div class="block">
              <h1 class="title">{{ product.title }}</h1>
              <template v-if="product.discount > 0">
                <h2 class="subtitle is-2 has-text-primary">
                  {{
                    product.grossPrice -
                    product.grossPrice * (product.discount / 100)
                  }}
                  &#8381;
                  <span class="strikethrough has-text-grey is-size-4">
                    &nbsp;{{ product.grossPrice }} &#8381;&nbsp;
                  </span>
                </h2>
              </template>
              <template v-else>
                <h2 class="subtitle is-2 has-text-primary">
                  {{ product.grossPrice }} &#8381;
                </h2>
              </template>
            </div>

            <div class="content">
              <p>{{ product.description }}</p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <b-field v-html="product.specification" />
            </div>
            <div class="columns">
              <div class="column is-three-fifths">
                <div class="block">
                  <b-field v-if="product.size.length > 1">
                    <b-select
                      v-model="productOption"
                      placeholder="Выберите размер"
                      expanded
                      @input="changeStock()"
                    >
                      <option
                        v-for="option in product.size"
                        :key="option.id"
                        :value="option"
                      >
                        {{ option.label }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field v-if="product.color.length > 1">
                    <b-select
                      v-model="productOption"
                      placeholder="Выберите цвет"
                      expanded
                      @input="changeStock()"
                    >
                      <option
                        v-for="option in product.color"
                        :key="option.id"
                        :value="option"
                      >
                        {{ option.label }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field v-if="productStock == 0 && product.stock == 0">
                    Товара нет в наличии
                  </b-field>
                  <b-field>
                    <div class="level is-mobile">
                      <div class="level-left">
                        <div class="level-item">
                          <b-numberinput
                            v-model="quantity"
                            controls-rounded
                            type="is-light"
                            :editable="false"
                            :min="1"
                            :max="productStock"
                          ></b-numberinput>
                        </div>
                      </div>
                      <div class="level-right">
                        <b-field v-if="!isProductInCart">
                          <b-button
                            expanded
                            :disabled="
                              productOption == null && product.stock == 0
                            "
                            label="Добавить в корзину"
                            @click.prevent="addToCart"
                          />
                        </b-field>
                        <b-field v-else>
                          <b-button
                            tag="nuxt-link"
                            to="/cart"
                            expanded
                            label="Перейти в корзину"
                          />
                        </b-field>
                      </div>
                    </div>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumbs from '@/components/common/BreadCrumbs'
export default {
  components: {
    BreadCrumbs,
  },
  validate({ params }) {
    return Boolean(params.id)
  },
  data() {
    return {
      quantity: 1,
      productOption: null,
      productStock: 1,
      loading: false,
      al: {
        hasGrayscale: false,
        itemsToShow: 4,
        itemsToList: 0,
        arrow: false,
        hasDrag: false,
      },
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('product/getProduct', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },
  head() {
    return {
      title: `${this.product.title}`,
    }
  },
  computed: {
    ...mapState({
      product: (state) => state.product.current,
      items: (state) => state.cart.items,
    }),
    isProductInCart() {
      return this.items.some((item) => item.id === this.product._id)
    },
  },

  mounted() {
    if (this.product.stock > 0) {
      this.productStock = this.product.stock
    }
  },

  methods: {
    changeStock() {
      this.productStock = this.productOption.stock
      this.quantity = 1
    },
    addToCart() {
      const product = {
        id: this.product._id,
        title: this.product.title,
        option: this.productOption,
        price: this.product.grossPrice,
        discount: this.product.discount,
        cover: this.product.cover,
        quantity: this.quantity,
        stock: this.productStock,
      }
      this.$store.dispatch('cart/addProductToCart', product)
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      this.$buefy.snackbar.open({
        message: 'Товар добавлен в корзину',
        position: 'is-bottom',
        actionText: '',
      })
    },
  },
}
</script>
<style>
.carousel .carousel-indicator {
  padding: 0.5rem 0;
}
</style>
