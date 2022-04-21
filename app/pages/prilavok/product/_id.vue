<template>
  <div style="min-height: calc(100vh - 180px)">
    <hero-bar> {{ heroTitle }} </hero-bar>
    <section class="section">
      <div class="container is-max-desktop">
        <form enctype="multipart/form-data" @submit.prevent="onSubmit">
          <b-field>
            <file-picker v-model="form.cover" />
          </b-field>
          <b-field>
            <files-upload v-model="form.media" />
          </b-field>
          <b-field class="pt-2">
            <b-switch v-model="form.isActive">Показывать товар</b-switch>
          </b-field>
          <b-field class="pt-2" label="Название">
            <b-input v-model="form.title" required />
          </b-field>
          <b-field class="pt-2" label="Категория">
            <b-select
              v-model="form.category"
              placeholder="Выберите категорию"
              icon="folder"
              required
            >
              <option
                v-for="category of titleSlugPath"
                :key="category._id"
                :value="category"
              >
                {{ category.title }}
              </option>
              <option value="">Нет</option>
            </b-select>
          </b-field>

          <b-field class="pt-2" label="Описание">
            <b-input v-model="form.description" type="textarea" />
          </b-field>
          <b-field class="pt-2" label="Доп. информация">
            <editor v-model="form.specification" />
          </b-field>

          <!-- Добавляем размер к товару -->

          <b-field class="pt-2">
            <b-switch v-model="isSize"> Добавить размер </b-switch>
          </b-field>

          <div v-if="isSize" class="container">
            <div class="notification is-light pb-5 mb-3">
              <div
                v-for="(item, index) in form.size"
                :key="index"
                class="block"
              >
                <b-field grouped group-multiline>
                  <b-field class="pt-2" label="Размер" expanded>
                    <b-input v-model="item.label" />
                  </b-field>
                  <b-field class="pt-2" label="Значение" expanded>
                    <b-input v-model="item.value" />
                  </b-field>
                  <b-field class="pt-2" label="Остаток" expanded>
                    <b-input v-model="item.stock" type="number" />
                  </b-field>
                </b-field>
                <b-field v-if="form.size.length > 1" class="pt-3" expanded>
                  <b-button
                    type="is-danger is-light"
                    icon-right="delete-bin-line"
                    expanded
                    @click="deleteSize(index)"
                  />
                </b-field>
              </div>
              <b-button rounded :loading="isLoading" @click="addSize()">
                Добавить
              </b-button>
            </div>
          </div>

          <!-- Добавляем цвет к товару -->

          <b-field class="pt-2">
            <b-switch v-model="isColor">Добавить цвета</b-switch>
          </b-field>

          <div v-if="isColor" class="container">
            <div class="notification is-light pb-5 mb-3">
              <div
                v-for="(item, index) in form.color"
                :key="index"
                class="block"
              >
                <b-field grouped group-multiline>
                  <b-field class="pt-2" label="Размер" expanded>
                    <b-input v-model="item.label" />
                  </b-field>
                  <b-field class="pt-2" label="Значение" expanded>
                    <b-input v-model="item.value" />
                  </b-field>
                  <b-field class="pt-2" label="Остаток" expanded>
                    <b-input v-model="item.stock" type="number" />
                  </b-field>
                </b-field>
                <b-field v-if="form.color.length > 1" class="pt-3" expanded>
                  <b-button
                    type="is-danger is-light"
                    icon-right="delete-bin-line"
                    expanded
                    @click="deleteColor(index)"
                  />
                </b-field>
              </div>
              <b-button
                class=""
                rounded
                :loading="isLoading"
                @click="addColor()"
              >
                Добавить
              </b-button>
            </div>
          </div>

          <b-field grouped>
            <b-field class="pt-2" label="Закупка" expanded>
              <b-input v-model="form.netPrice" type="number" required />
            </b-field>
            <b-field class="pt-2" label="Продажа" expanded>
              <b-input v-model="form.grossPrice" type="number" required />
            </b-field>
          </b-field>

          <b-field class="pt-2" label="Скидка">
            <b-input v-model="form.discount" type="number" />
          </b-field>
          <p v-if="form.discount > 0">
            Цена с учетом скидки: {{ actualPrice }} &#8381;
          </p>
          <b-field v-if="!isColor && !isSize" class="pt-2" label="Остаток">
            <b-input v-model="form.stock" type="number" required />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Editor from '@/components/prilavok/Editor'
import HeroBar from '@/components/prilavok/HeroBar'
import FilePicker from '@/components/prilavok/FilePicker'
import FilesUpload from '@/components/prilavok/FilesUpload'

export default {
  components: {
    FilesUpload,
    FilePicker,
    HeroBar,
    Editor,
  },
  layout: 'prilavok',
  data() {
    return {
      isLoading: false,
      isColor: false,
      isSize: false,
      form: {},
      isItemExists: false,
    }
  },
  async fetch() {
    const { store, params, error } = this.$nuxt.context
    try {
      await store.dispatch('category/getCategories')
      if (params.id) {
        const product = await store.dispatch(
          'product/fetchAdminById',
          params.id
        )
        this.form = product
        this.isItemExists = true
        if (product.size.length > 1) {
          this.isSize = true
        }
        if (product.color.length > 1) {
          this.isColor = true
        }
        // if (product.categories) {
        //   this.getCatItem()
        // }
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
      title: 'Товары — магазин экотоваров PourToi',
    }
  },
  computed: {
    ...mapGetters('category', ['titleSlugPath']),
    heroTitle() {
      if (this.isItemExists) {
        return 'Редактор товара'
      } else {
        return 'Новый товар'
      }
    },
    heroRouterLinkTo() {
      if (this.isItemExists) {
        return '/prilavok/product'
      } else {
        return '/prilavok/products'
      }
    },
    heroRouterLinkLabel() {
      if (this.isItemExists) {
        return 'Добавить товар'
      } else {
        return 'Все товары'
      }
    },
    formCardTitle() {
      if (this.isItemExists) {
        return 'Редактировать товар'
      } else {
        return 'Новый товар'
      }
    },
    actualPrice() {
      return (
        this.form.grossPrice - this.form.grossPrice * (this.form.discount / 100)
      )
    },
  },
  methods: {
    addSize() {
      this.form.size.push({ label: '', value: '', stock: 0 })
    },
    addColor() {
      this.form.color.push({ label: '', value: '', stock: 0 })
    },
    deleteSize(index) {
      this.form.size.splice(index, 1)
      this.$buefy.snackbar.open({
        message: 'Опция удалена',
        actionText: '',
      })
    },
    deleteColor(index) {
      this.form.color.splice(index, 1)
      this.$buefy.snackbar.open({
        message: 'Опция удалена',
        actionText: '',
      })
    },
    clearForm() {
      this.form = this.getClearFormObject()
    },
    getClearFormObject() {
      return {
        id: '',
        title: '',
        category: null,
        description: '',
        specification: '',
        size: [{ label: '', value: '', stock: 0 }],
        color: [{ label: '', value: '', stock: 0 }],
        netPrice: 0,
        grossPrice: 0,
        discount: 0,
        stock: 0,
        cover: '',
        media: '',
        isActive: true,
      }
    },
    onSubmit() {
      this.isLoading = true
      this.$store.dispatch(
        !this.isItemExists ? 'product/create' : 'product/update',
        this.form
      )
      this.isLoading = false
      this.$router.go(-1)
      this.$buefy.snackbar.open({
        message: !this.isItemExists ? 'Товар добавлен' : 'Товар обновлен',
        actionText: '',
      })
    },
  },
}
</script>
