<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="title"
      :data="products"
    >
      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div class="image">
            <img :src="props.row.cover" class="is-rounded" />
          </div>
        </b-table-column>
        <b-table-column label="Название" field="title" sortable>
          {{ props.row.title }}
        </b-table-column>
        <b-table-column label="Категория" field="category" sortable>
          {{ props.row.category }}
        </b-table-column>
        <b-table-column label="Закупка" field="NetPrice" sortable>
          {{ props.row.NetPrice }}
        </b-table-column>
        <b-table-column label="Продажа" field="GrossPrice" sortable>
          {{ props.row.GrossPrice }}
        </b-table-column>
        <b-table-column label="Остаток">
          <small class="has-text-grey is-abbr-like" :title="props.row.stock">
            {{ props.row._id }}
          </small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="{
                name: 'prilavok-product-id',
                params: { id: props.row._id },
              }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Загружаю данные...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Список пуст&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/prilavok/ModalBox'

export default {
  components: { ModalBox },
  props: {
    dataUrl: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      products: this.dataUrl,
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.title
      }
      return null
    },
  },
  mounted() {
    if (this.dataUrl.length > this.perPage) {
      this.paginated = true
    }
  },
  methods: {
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$store.dispatch('product/remove', this.trashObject._id)
      this.products = this.dataUrl.filter((i) => i._id !== this.trashObject._id)
      this.$buefy.snackbar.open({
        message: 'Товар удален',
        position: 'is-bottom',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
