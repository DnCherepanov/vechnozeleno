<template>
  <main>
    <hero-bar> Редактор товара </hero-bar>
    <section class="section">
      <div class="container is-max-desktop">
        <form enctype="multipart/form-data" @submit.prevent="onSubmit">
          <b-field class="pt-2" label="Заголовок">
            <b-input v-model="article.title" required />
          </b-field>
          <b-field label="Изображения">
            <files-upload v-model="article.media" />
          </b-field>
          <b-field class="pt-2" label="Содержание">
            <editor v-model="article.content" />
          </b-field>
          <b-field label="#Тэги">
            <b-taginput
              v-model="article.tags"
              ellipsis
              icon="price-tag-3-fill"
              placeholder="Добавить #тэг"
              aria-close-label="Удалить #тэг"
            >
            </b-taginput>
          </b-field>
          <b-field class="pt-2" grouped position="is-centered">
            <p class="control">
              <b-button
                type="is-dark"
                rounded
                :loading="isLoading"
                native-type="submit"
              >
                Сохранить
              </b-button>
              <b-button
                class="ml-2"
                rounded
                :loading="isLoading"
                @click.prevent="clearForm()"
              >
                Очистить
              </b-button>
            </p>
          </b-field>
        </form>
      </div>
    </section>
    {{ article }}
  </main>
</template>

<script>
import { mapState } from 'vuex'
import HeroBar from '@/components/prilavok/HeroBar'
import Editor from '@/components/prilavok/Editor'
import FilesUpload from '@/components/prilavok/FilesUpload'
export default {
  components: {
    HeroBar,
    Editor,
    FilesUpload,
  },
  layout: 'prilavok',
  data() {
    return {
      isLoading: false,
    }
  },
  async fetch() {
    const { store, params, error } = this.$nuxt.context
    try {
      await store.dispatch('article/getArticle', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },
  head() {
    return {
      title: 'Статья — магазин экотоваров PourToi',
    }
  },
  computed: {
    ...mapState({
      article: (state) => state.article.current,
    }),
  },
  methods: {
    clearForm() {
      this.form = {
        title: '',
        content: '',
        media: '',
        tags: '',
      }
    },
    onSubmit() {
      this.isLoading = true
      this.$store.dispatch('article/create', this.form)
      this.isLoading = false
      this.$router.go(-1)
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      this.$buefy.snackbar.open({
        message: 'Статья добавлена',
        position: 'is-bottom',
        actionText: '',
      })
    },
  },
}
</script>
