<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="shopping-cart-line"
          :number="sold"
          suffix=" шт."
          label="Заказов"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="currency-line"
          :number="total"
          suffix=" руб."
          label="Выручка"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="bill-line"
          :number="average"
          suffix=" руб."
          label="Средний чек"
        />
      </tiles>

      <card-component
        title="Статистика"
        icon="line-chart-line"
        header-icon="refresh-line"
        @header-icon-click="fillChartData"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            ref="bigChart"
            style="height: 100%"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          />
        </div>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as chartConfig from '@/components/prilavok/Charts/chart.config'
import TitleBar from '@/components/prilavok/TitleBar'
import Tiles from '@/components/prilavok/Tiles'
import CardWidget from '@/components/prilavok/CardWidget'
import CardComponent from '@/components/prilavok/CardComponent'
import LineChart from '@/components/prilavok/Charts/LineChart'
export default {
  components: {
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    TitleBar,
  },
  layout: 'prilavok',
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
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
      title: 'Pourtoi - прилавок',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    }
  },
  computed: {
    ...mapGetters('order', ['total', 'sold', 'average']),
    titleStack() {
      return ['Аналитика']
    },
  },
  mounted() {
    this.fillChartData()
  },
  methods: {
    randomChartData(n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 100))
      }

      return data
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(12),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(12),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(12),
          },
        ],
        labels: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ],
      }
    },
  },
}
</script>
