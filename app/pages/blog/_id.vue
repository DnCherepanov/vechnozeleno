<!-- eslint-disable vue/no-v-html -->
<template>
  <main>
    <section class="section">
      <bread-crumbs />
      <div class="container hero is-halfheight is-primary has-background">
        <img
          v-if="article.photo"
          class="hero-background is-transparent"
          :src="`${article.photo}-1400`"
        />
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">
              {{ article.title }}
            </p>
          </div>
        </div>
      </div>
      <div class="container mt-4">
        <div class="level is-mobile">
          <div class="level-left">
            <p class="level-item has-text-grey">
              <small>читать ~{{ article.readingTime }} мин</small>
            </p>
            <a class="level-item">
              <b-taglist>
                <b-tag v-for="tag in article.tags" :key="tag">
                  {{ tag }}
                </b-tag>
              </b-taglist>
            </a>
          </div>
          <div class="level-right">
            <a role="button" aria-label="Ссылка" @click="copyToClipboard">
              <b-icon class="pr-4" icon="link" />
            </a>
            <a
              role="button"
              aria-label="Закладка"
              @click="addToBookmarks(this)"
            >
              <b-icon icon="bookmark-line" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container is-max-desktop">
        <div class="content entry-content" v-html="article.content"></div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
import BreadCrumbs from '@/components/common/BreadCrumbs'
export default {
  components: {
    BreadCrumbs,
  },
  async fetch({ store, params }) {
    await store.dispatch('article/getArticle', params.id)
  },
  head() {
    const title = 'Блог'
    const description = 'Блог онлайн экомаркета Pourtoi'
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
    ...mapGetters('article', ['article']),
  },
  methods: {
    copyToClipboard() {
      const pageURL = document.location
      navigator.clipboard.writeText(pageURL)
      this.$buefy.toast.open('Ссылка скопирована')
    },
    addToBookmarks(a) {
      const pageTitle = document.title
      const pageURL = document.location
      try {
        // Internet Explorer solution
        // eslint-disable-next-line security/detect-eval-with-expression, no-eval
        eval(
          'window.external.AddFa-vorite(pageURL, pageTitle)'.replace(/-/g, '')
        )
      } catch (e) {
        try {
          // Mozilla Firefox solution
          window.sidebar.addPanel(pageTitle, pageURL, '')
        } catch (e) {
          // Opera solution
          if (typeof opera === 'object') {
            a.rel = 'sidebar'
            a.title = pageTitle
            a.url = pageURL
            return true
          } else {
            // The rest browsers (i.e Chrome, Safari)
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            this.$buefy.toast.open(
              'Нажмите ' +
                (navigator.userAgent.toLowerCase().includes('mac')
                  ? 'Cmd'
                  : 'Ctrl') +
                '+D чтобы добавить в закладки.'
            )
          }
        }
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.container.has-background {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
.hero-background.is-transparent {
  opacity: 0.9;
}
</style>
