<template>
  <main>
    <Hero />
    <BannersTop />
    <section class="section withTitle">
      <div class="container">
        <h3
          class="subtitle is-size-5 has-text-grey-light has-text-centered is-hidden-touch"
        >
          Позаботься о себе и о природе
        </h3>
        <h2 class="title is-size-2 has-text-centered">Последние поступления</h2>
      </div>
    </section>
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
              v-for="product in activeProducts.slice(0, 8)"
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
      <div class="container pt-5 is-flex is-justify-content-center">
        <b-button
          type="is-black"
          outlined
          label="Перейти в каталог"
          tag="nuxt-link"
          to="/catalog"
        />
      </div>
    </section>
    <section class="section has-background-primary-light">
      <div class="container">
        <div class="block is-flex is-align-items-center">
          <b-icon class="mr-1" icon="instagram-line" type="is-dark" />
          <h2 class="title is-size-5 has-text-weight-light">
            Следите за нами в Instagram
          </h2>
        </div>
        <client-only>
          <insta-feed container-class="columns is-mobile instagram">
            <template #feeds="props">
              <div class="column">
                <a :href="props.feed.permalink" rel="noopener" target="_blank">
                  <div class="card">
                    <div class="card-image">
                      <b-image
                        :src="props.feed.media_url"
                        alt="Инстаграм пост"
                        ratio="1by1"
                      >
                        <template #placeholder>
                          <b-skeleton height="100%" />
                        </template>
                      </b-image>
                    </div>
                  </div>
                </a>
              </div>
            </template>
          </insta-feed>
        </client-only>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Hero from '@/components/common/Hero'
import BannersTop from '@/components/common/BannersTop'
import ProductCard from '@/components/common/ProductCard'
import InstaFeed from '@/components/common/InstaFeed'
export default {
  components: {
    Hero,
    BannersTop,
    ProductCard,
    InstaFeed,
  },
  data() {
    return {
      column: 'column is-6-mobile is-3-tablet is-3-desktop',
      limit: 8,
    }
  },
  async fetch() {
    await this.$store.dispatch('product/getProducts', this.limit)
  },
  head() {
    const title = 'Эко магазин товаров для дома в Южно-Сахалинске'
    const description =
      'Натуральные, экологически чистые товары без пластика. Организуй красивый и экологичный быт с минимальным воздействием на окружающую среду. Собираем экобоксы, общаемся и делимся советами на разные темы в области экологии.'
    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://pourtoi.ru/' },
        { property: 'og:site_name', content: 'Pour Toi' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
  computed: {
    ...mapGetters('product', ['activeProducts']),
  },
}
</script>
<style lang="scss" scoped>
.b-skeleton {
  height: 100%;
  position: absolute;
  top: 0;
}
@media screen and (max-width: 768px) {
  .section.withTitle {
    padding: 0 1.5rem;
    .title {
      margin: 0;
    }
    .title.is-size-2 {
      font-size: 2rem !important;
    }
  }
}
</style>
