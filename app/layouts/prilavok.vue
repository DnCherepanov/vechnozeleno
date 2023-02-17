<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/prilavok/NavBar'
import AsideMenu from '@/components/prilavok/AsideMenu'

export default {
  components: {
    AsideMenu,
    NavBar,
  },
  middleware: 'auth',
  computed: {
    ...mapState({
      orders: (state) => state.order.orders,
    }),
    menu() {
      return [
        'Аналитика',
        [
          {
            to: '/prilavok',
            label: 'Панель',
            icon: 'bar-chart-2-line',
          },
        ],
        'Склад',
        [
          {
            to: '/prilavok/products',
            label: 'Товары',
            icon: 'table-line',
          },
          {
            to: '/prilavok/categories',
            label: 'Категории',
            icon: 'folders-line',
          },
          {
            to: '/',
            label: 'Отзывы',
            icon: 'message-2-line',
          },
        ],
        'Общее',
        [
          {
            to: '/prilavok/orders',
            label: 'Заказы',
            icon: 'shopping-bag-3-line',
            updateMark: this.orders.some((order) => order.status === 'Новый'),
          },
          {
            href: '/prilavok/blog',
            label: 'Статьи',
            icon: 'newspaper-line',
          },
          {
            href: '/',
            label: 'Витрина',
            icon: 'store-2-line',
          },
        ],
      ]
    },
  },

  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
}
</script>
