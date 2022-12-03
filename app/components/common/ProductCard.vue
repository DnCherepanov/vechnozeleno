<template>
  <article :class="column">
    <nuxt-link :to="{ name: 'catalog-product-id', params: { id } }">
      <div class="card">
        <div class="card-image has-background-light">
          <client-only>
            <b-image
              alt="Фотография товара"
              :srcset-sizes="[500, 800]"
              ratio="1by1"
              :srcset-formatter="formatSrcset"
            >
              <template #placeholder>
                <b-skeleton height="100%"></b-skeleton>
              </template>
            </b-image>
          </client-only>
        </div>
        <div class="card-content py-3 px-0">
          <div class="content">
            {{ title }}
            <template v-if="discount > 0">
              <b-tag class="discount" type="is-danger is-light">
                &minus;{{ discount }}%
              </b-tag>
              <p>
                <strong> {{ price - price * (discount / 100) }} &#8381;</strong>
                <span
                  style="text-decoration: line-through"
                  class="has-text-grey is-size-7"
                >
                  {{ price }} &#8381;
                </span>
              </p>
            </template>
            <template v-else>
              <p>
                <strong> {{ price }} &#8381;</strong>
              </p>
            </template>
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    column: {
      type: String,
      default: 'column is-6-mobile is-3-tablet is-3-desktop',
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loadedSrc1: '',
    }
  },
  methods: {
    formatSrcset(src, size) {
      return `${this.image}-${size / 2}`
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
}
.b-skeleton {
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
