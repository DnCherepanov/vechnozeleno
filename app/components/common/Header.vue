<template>
  <header class="section pt-2 pb-0">
    <div class="navbar">
      <div class="navbar__left">
        <a
          class="navbar__burger mr-4 is-hidden-desktop"
          :class="{ active: isBurgerOpen }"
          role="button"
          aria-label="Меню"
          @click="isBurgerOpen = !isBurgerOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        <a role="button" aria-label="Поиск" @click="cardModal">
          <b-icon icon="search-line" />
        </a>
      </div>
      <div class="navbar__logo">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
      </div>
      <div class="navbar__right">
        <client-only>
          <header-cart />
        </client-only>
      </div>
      <nav
        :class="{ active: isBurgerOpen }"
        class="is-size-4-touch"
        role="navigation"
        aria-label="Навигация"
      >
        <NuxtLink
          to="/catalog"
          class="navbar-item"
          @click.native="isBurgerOpen = !isBurgerOpen"
        >
          Новинки
        </NuxtLink>
        <header-menu
          v-for="category of categories"
          :key="category._id"
          :slug="category.slug"
          :title="category.title"
          @closeBurger="isBurgerOpen = false"
        />
        <NuxtLink
          class="navbar-item"
          to="/blog"
          @click.native="isBurgerOpen = !isBurgerOpen"
          >Блог</NuxtLink
        >
        <NuxtLink
          class="navbar-item"
          to="/contacts"
          @click.native="isBurgerOpen = !isBurgerOpen"
          >Контакты</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/common/Logo'
import SearchField from '@/components/common/SearchField'
import HeaderMenu from '@/components/common/HeaderMenu'
import HeaderCart from '@/components/common/HeaderCart'
export default {
  components: { Logo, HeaderCart, HeaderMenu },
  data() {
    return {
      isBurgerOpen: false,
    }
  },
  async fetch() {
    const { store } = this.$nuxt.context
    await store.dispatch('category/getCategories')
  },
  computed: {
    ...mapGetters('category', ['categories']),
  },
  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        customClass: 'search-form',
        component: SearchField,
        trapFocus: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
header .navbar {
  background: transparent;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
  &__left {
    display: flex;
    align-items: center;
    justify-self: left;
  }
  &__right {
    justify-self: right;
  }
  &__burger {
    width: 24px;
    height: 24px;
    display: block;
    background: transparent;
    z-index: 2;
    span {
      display: block;
      position: relative;
      width: 100%;
      height: 2px;
    }
    span + span {
      margin-top: 5px;
    }
    span:nth-child(1) {
      animation: ease 0.5s top-back forwards;
    }
    span:nth-child(2) {
      animation: ease 0.5s middle-back forwards;
    }
    span:nth-child(3) {
      animation: ease 0.5s bottom-back forwards;
    }
  }
  &__burger.active span:nth-child(1) {
    animation: ease 0.3s top forwards;
  }
  &__burger.active span:nth-child(2) {
    animation: ease 0.3s middle forwards;
  }
  &__burger.active span:nth-child(3) {
    animation: ease 0.3s bottom forwards;
  }
  nav {
    display: inline-flex;
    grid-column: 1/4;
    grid-row: 2;
    a.navbar-item {
      position: relative;
      &::after {
        content: '';
        backface-visibility: hidden;
        transition: 0.3s all ease;
        position: absolute;
        left: 0.75rem;
        bottom: 0.5rem;
        width: 0;
        height: 0.08rem;
      }
      &:hover::after {
        width: calc(100% - 1.5rem);
      }
    }
    a.nuxt-link-exact-active {
      color: #121212;
      &::after {
        content: '';
        backface-visibility: hidden;
        transition: 0.3s all ease;
        position: absolute;
        left: 0.75rem;
        bottom: 0.5rem;
        width: calc(100% - 1.5rem);
        height: 0.08rem;
      }
    }
  }
}

@keyframes top {
  0% {
    top: 0;
    transform: rotate(0);
  }
  50% {
    top: 7px;
    transform: rotate(0);
  }
  100% {
    top: 7px;
    transform: rotate(45deg);
  }
}

@keyframes top-back {
  0% {
    top: 7px;
    transform: rotate(45deg);
  }
  50% {
    top: 7px;
    transform: rotate(0);
  }
  100% {
    top: 0;
    transform: rotate(0);
  }
}

@keyframes middle {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes middle-back {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bottom {
  0% {
    bottom: 0;
    transform: rotate(0);
  }
  50% {
    bottom: 7px;
    transform: rotate(0);
  }
  100% {
    bottom: 7px;
    transform: rotate(135deg);
  }
}

@keyframes bottom-back {
  0% {
    bottom: 7px;
    transform: rotate(135deg);
  }
  50% {
    bottom: 7px;
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    bottom: 0;
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
}
@media (max-width: 1024px) {
  header .navbar {
    grid-template-rows: 1fr;
  }
  header .navbar nav {
    position: fixed;
    display: block;
    padding: 60px 15px;
    height: 100%;
    width: 100%;
    left: -100%;
    top: 0;
    background: #fff;
    -webkit-transition: left 0.5s ease;
    transition: left 0.5s ease;
    overflow: auto;
    z-index: 1;
  }
  header .navbar > .active {
    left: 0;
  }
}
</style>
