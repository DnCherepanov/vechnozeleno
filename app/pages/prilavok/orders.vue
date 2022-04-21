<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <hero-bar> Заказы </hero-bar>
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
            :data="orders"
          >
            <b-table-column v-slot="props" label="№" field="id">
              {{ orders.indexOf(props.row) + 1 }}
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="Дата и время"
              field="date"
              sortable
            >
              {{ props.row.date | date() }}
            </b-table-column>
            <b-table-column
              v-slot="props"
              label="ФИО"
              field="firstName"
              sortable
            >
              {{ props.row.customer.firstName }}
              {{ props.row.customer.lastName }}
            </b-table-column>
            <b-table-column v-slot="props" label="Телефон" field="phone">
              {{ props.row.customer.phone }}
            </b-table-column>
            <b-table-column v-slot="props" label="Почта" field="email">
              {{ props.row.customer.email }}
            </b-table-column>
            <b-table-column v-slot="props" label="Статус" field="status">
              {{ props.row.status }}
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
                    name: 'prilavok-order-id',
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
  </div>
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
      index: 0,
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
    }
  },
  async fetch() {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('order/getOrders')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Невозможно получить данные',
      })
    }
  },
  head() {
    return {
      title: 'Заказы — магазин экотоваров PourToi',
    }
  },
  computed: {
    ...mapState({
      orders: (state) => state.order.orders,
    }),
  },
  mounted() {
    if (this.orders.length > this.perPage) {
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
      this.$store.dispatch('order/remove', this.trashObject._id)
      this.$buefy.snackbar.open({
        message: 'Заказ удален',
        queue: false,
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
