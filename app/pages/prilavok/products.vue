<template>
  <main>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <hero-bar> Товары </hero-bar>
    <b-button
      type="is-primary"
      rounded
      class="fixedButton"
      tag="nuxt-link"
      to="/prilavok/product"
      icon-right="add-line"
    />
    <section class="section is-main-section">
      <div class="card has-table has-mobile-sort-spaced">
        <div class="card-content">
          <b-table
            :loading="isLoading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="title"
            :data="products"
          >
            <b-table-column
              v-slot="props"
              class="has-no-head-mobile is-image-cell"
            >
              <div class="image">
                <b-image
                  :src="`${props.row.cover}-250`"
                  src-fallback="/products/default-cover.svg"
                  alt="Фото товара"
                  ratio="1by1"
                  rounded
                />
              </div>
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Название"
              field="title"
              sortable
            >
              <NuxtLink :to="`/prilavok/product/${props.row._id}`">
                {{ props.row.title }}
              </NuxtLink>
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Закупка"
              field="netPrice"
              sortable
            >
              {{ props.row.netPrice }} руб.
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Продажа"
              field="grossPrice"
              sortable
            >
              {{ props.row.grossPrice }} руб.
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Остаток"
              field="stock"
              sortable
            >
              {{ props.row.stock }} шт.
            </b-table-column>
            <b-table-column
              v-slot="props"
              centered
              custom-key="actions"
              class="is-actions-cell"
            >
              <div class="buttons is-right">
                <nuxt-link
                  class="mr-5"
                  :to="{
                    name: 'prilavok-product-id',
                    params: { id: props.row._id },
                  }"
                >
                  <b-icon icon="pencil-line" size="is-small" />
                </nuxt-link>
                <a role="button" @click.prevent="trashModal(props.row)">
                  <b-icon icon="delete-bin-line" size="is-small" />
                </a>
              </div>
            </b-table-column>
          </b-table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import ModalBox from '@/components/prilavok/ModalBox'
import HeroBar from '@/components/prilavok/HeroBar'
export default {
  components: {
    HeroBar,
    ModalBox,
  },
  layout: 'prilavok',
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: true,
      perPage: 10,
    }
  },
  async fetch() {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('product/getProducts')
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
    ...mapState({
      products: (state) => state.product.products,
    }),
    titleStack() {
      return ['Товары']
    },
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.title
      }
      return null
    },
  },
  methods: {
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$store.dispatch('product/remove', this.trashObject._id)
      this.$buefy.snackbar.open({
        message: 'Товар удален',
        actionText: '',
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
}
</style>
