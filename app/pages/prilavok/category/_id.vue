<template>
  <div>
    <hero-bar>
      {{ heroTitle }}
      <nuxt-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button is-primary is-rounded"
      >
        {{ heroRouterLinkLabel }}
      </nuxt-link>
    </hero-bar>
    <section v-if="$fetchState.pending" class="section">
      <div class="content has-text-grey has-text-centered">
        <template>
          <p>
            <b-icon icon="dots-horizontal" size="is-large" />
          </p>
          <p>Загружаю данные...</p>
        </template>
      </div>
    </section>
    <section v-else class="section is-main-section">
      <tiles>
        <card-component class="tile is-child">
          <form enctype="multipart/form-data" @submit.prevent="onSubmit">
            <b-field label="Название">
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Родительская категория">
              <b-select
                v-model="form.parent"
                placeholder="Выберите категорию"
                icon="folder"
              >
                <option
                  v-for="category of categories"
                  :key="category._id"
                  :value="category.path"
                >
                  {{ category.title }}
                </option>
                <option value="/">Нет</option>
              </b-select>
            </b-field>
            <b-field class="pt-4">
              <b-button
                type="is-dark is-rounded"
                :loading="isLoading"
                native-type="submit"
              >
                Сохранить
              </b-button>
            </b-field>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HeroBar from '@/components/prilavok/HeroBar'
import Tiles from '@/components/prilavok/Tiles'
import CardComponent from '@/components/prilavok/CardComponent'

export default {
  components: {
    CardComponent,
    Tiles,
    HeroBar,
  },
  layout: 'prilavok',
  data() {
    return {
      isLoading: false,
      form: {},
      isItemExists: false,
    }
  },
  async fetch() {
    const { store, params, error } = this.$nuxt.context
    try {
      await store.dispatch('category/getCategories')
      if (params.id) {
        await store.dispatch('category/getAdminCategory', params.id)
        this.form = this.current
        this.isItemExists = true
      } else {
        this.form = this.getClearFormObject()
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },
  head() {
    return {
      title: 'Категория — магазин экотоваров PourToi',
    }
  },
  computed: {
    ...mapState({
      current: (state) => state.category.current,
    }),
    ...mapGetters('category', ['categories']),
    heroTitle() {
      if (this.isItemExists) {
        return 'Редактируем категорию'
      } else {
        return 'Создаем категорию'
      }
    },
    heroRouterLinkTo() {
      if (this.isItemExists) {
        return '/prilavok/category'
      } else {
        return '/prilavok/categories'
      }
    },
    heroRouterLinkLabel() {
      if (this.isItemExists) {
        return 'Добавить категорию'
      } else {
        return 'Все категории'
      }
    },
  },
  methods: {
    getClearFormObject() {
      return {
        title: '',
        parent: '/',
      }
    },
    onSubmit() {
      this.isLoading = true
      this.$store.dispatch(
        !this.isItemExists ? 'category/create' : 'category/update',
        this.form
      )
      this.isLoading = false
      this.$router.go(-1)
      this.$buefy.snackbar.open({
        message: !this.isItemExists
          ? 'Категория добавлена'
          : 'Категория обновлена',
        actionText: '',
        position: 'is-bottom',
      })
    },
  },
}
</script>
