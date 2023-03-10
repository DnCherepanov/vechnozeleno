<template>
  <main>
    <hero-bar> Добавить запись </hero-bar>
    <section class="section">
      <div class="container is-max-desktop">
        <form enctype="multipart/form-data" @submit.prevent="onSubmit">
          <b-field class="pt-2" label="Заголовок">
            <b-input v-model="form.title" required />
          </b-field>
          <b-field class="pt-2">
            <file-picker v-model="form.photo" />
          </b-field>
          <b-field label="Коротко">
            <b-input
              v-model="form.intro"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
          <b-field class="pt-2" label="Полный текст">
            <editor v-model="form.content" />
          </b-field>
          <b-field label="#Тэги">
            <b-taginput
              v-model="form.tags"
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
  </main>
</template>

<script>
import Editor from '@/components/prilavok/Editor'
import HeroBar from '@/components/prilavok/HeroBar'
import FilePicker from '@/components/prilavok/FilePicker'
export default {
  components: {
    HeroBar,
    FilePicker,
    Editor,
  },
  layout: 'prilavok',
  data() {
    return {
      isLoading: false,
      form: {},
    }
  },
  methods: {
    clearForm() {
      this.form = {
        title: '',
        intro: '',
        content: '',
        photo: '',
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
