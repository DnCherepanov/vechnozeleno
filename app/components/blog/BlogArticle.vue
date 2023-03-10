<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="columns is-desktop">
    <div class="column is-one-quarter" style="min-height: 200px">
      <nuxt-link :to="{ name: 'blog-id', params: { id } }">
        <b-image
          v-if="image"
          custom-class="media-left is-radius"
          :src="`${image}-500`"
          :placeholder="`${image}-800?blur=10`"
          ratio="6by4"
        >
        </b-image>
        <div
          v-else
          class="has-background-primary is-radius"
          style="min-height: 210px; width: 100%"
        ></div>
      </nuxt-link>
    </div>
    <div class="column">
      <div class="media-content">
        <div class="content">
          <nuxt-link :to="{ name: 'blog-id', params: { id } }">
            <h3>{{ title }}</h3>
          </nuxt-link>
          <div class="block">
            <p>
              {{ intro }}
            </p>
          </div>
        </div>

        <nav class="level is-mobile">
          <div class="level-left">
            <p class="level-item has-text-grey">
              <small>читать ~{{ readingTime }} мин</small>
            </p>
            <a class="level-item">
              <b-taglist>
                <b-tag v-for="tag in tags" :key="tag">
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
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    copyToClipboard() {
      const pageURL = document.location + '/' + this.id
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
.columns {
  gap: 1rem;
}
.content .block {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
