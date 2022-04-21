<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <hero-bar> Категории </hero-bar>
    <b-button
      type="is-primary"
      rounded
      class="fixedButton"
      tag="nuxt-link"
      to="/prilavok/category"
      icon-right="add-line"
    />
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced">
        <b-table
          :paginated="paginated"
          :per-page="perPage"
          :striped="true"
          :hoverable="true"
          default-sort="title"
          :data="categories"
          detailed
          custom-detail-row
        >
          <b-table-column
            v-slot="props"
            label="Название"
            field="title"
            sortable
            :has-detailed-visible="false"
          >
            <NuxtLink :to="`/prilavok/category/${props.row._id}`">
              {{ props.row.title }}
            </NuxtLink>
          </b-table-column>

          <b-table-column
            v-slot="props"
            label="Идентификатор"
            field="slug"
            sortable
          >
            {{ props.row.slug }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            centered
            custom-key="actions"
            class="is-actions-cell"
          >
            <div class="buttons is-right">
              <b-button
                rounded
                tag="nuxt-link"
                type="is-text"
                :to="{
                  name: 'prilavok-category-id',
                  params: {
                    id: props.row._id,
                  },
                }"
              >
                <b-icon icon="playlist-edit" size="is-small" />
              </b-button>
              <b-button
                rounded
                type="is-text"
                @click.prevent="trashModal(props.row)"
              >
                <b-icon icon="trash-can-outline" size="is-small" />
              </b-button>
            </div>
          </b-table-column>
          <template slot="detail" slot-scope="props">
            <tr v-for="sub in props.row.subs" :key="sub._id">
              <td></td>
              <td>
                <NuxtLink :to="`/prilavok/category/${sub._id}`">
                  {{ sub.title }}
                </NuxtLink>
              </td>
              <td>
                {{ sub.slug }}
              </td>
              <td>
                <div class="buttons is-right">
                  <nuxt-link
                    class="mr-5"
                    :to="{
                      name: 'prilavok-category-id',
                      params: { id: sub._id },
                    }"
                  >
                    <b-icon icon="pencil-line" size="is-small" />
                  </nuxt-link>
                  <a role="button" @click.prevent="trashModal(sub)">
                    <b-icon icon="delete-bin-line" size="is-small" />
                  </a>
                </div>
              </td>
            </tr>
          </template>
        </b-table>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalBox from '@/components/prilavok/ModalBox'
import CardComponent from '@/components/prilavok/CardComponent'
import HeroBar from '@/components/prilavok/HeroBar'
export default {
  components: {
    HeroBar,
    CardComponent,
    ModalBox,
  },
  layout: 'prilavok',
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      paginated: false,
      perPage: 10,
    }
  },
  async fetch() {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('category/getCategories')
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
    ...mapGetters('category', ['categories']),
    titleStack() {
      return ['Товары']
    },
    trashObjectName() {
      return this.trashObject ? this.trashObject.title : null
    },
  },
  watchQuery: true,
  mounted() {
    if (this.categories.length > this.perPage) {
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
      this.$store.dispatch('category/remove', this.trashObject)
      this.$fetch()
      this.$buefy.snackbar.open({
        message: 'Категория удалена',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row)
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
}
</style>
