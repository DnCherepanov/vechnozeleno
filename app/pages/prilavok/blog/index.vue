<template>
  <main>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <hero-bar> Записи в блоге </hero-bar>
    <b-button
      type="is-primary"
      rounded
      class="fixedButton"
      tag="nuxt-link"
      to="/prilavok/blog/new"
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
            default-sort="date"
            default-sort-direction="desc"
            :data="articles"
          >
            <b-table-column
              v-slot="props"
              label="Заголовок"
              field="title"
              sortable
            >
              <NuxtLink :to="`/prilavok/blog/${props.row._id}`">
                {{ props.row.title }}
              </NuxtLink>
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Создана"
              field="date"
              sortable
            >
              {{ new Date(props.row.date).toLocaleDateString() }}
            </b-table-column>
            <b-table-column v-slot="props" label="Тэги" field="tags">
              <span
                v-for="tag in props.row.tags"
                :key="tag.id"
                class="tag is-info is-light"
                style="margin-left: 5px"
              >
                {{ tag }}
              </span>
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
                    name: 'prilavok-blog-id',
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
      await store.dispatch('article/getArticles')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },
  head() {
    return {
      title: 'Статьи — магазин экотоваров PourToi',
    }
  },
  computed: {
    ...mapState({
      articles: (state) => state.article.articles,
    }),
    titleStack() {
      return ['Статьи']
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
      this.$store.dispatch('article/remove', this.trashObject)
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      this.$buefy.snackbar.open({
        message: 'Товар удален',
        position: 'is-bottom',
        actionText: '',
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>

<!-- <style lang="scss" scoped></style> -->
