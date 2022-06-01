<template>
  <header>
    <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
      <div class="navbar-brand">
        <a
          class="navbar-item is-hidden-desktop"
          @click.prevent="menuToggleMobile"
        >
          <b-icon :icon="menuToggleMobileIcon" />
        </a>
        <div class="navbar-item no-left-space-touch">
          <div class="control">
            <input class="input" placeholder="Поиск по магазину..." />
          </div>
        </div>
      </div>
      <div class="navbar-brand is-right">
        <a
          class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
          @click.prevent="menuNavBarToggle"
        >
          <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
        </a>
      </div>
      <div
        class="navbar-menu fadeIn animated faster"
        :class="{ 'is-active': isMenuNavBarActive }"
      >
        <div class="navbar-end">
          <a
            class="navbar-item has-divider is-desktop-icon-only"
            title="Светло/Темно"
            @click="darkModeToggle"
          >
            <b-icon :icon="darkModeToggleIcon" custom-size="default" />
            <span>Светло/Темно</span>
          </a>
          <nuxt-link
            to="/prilavok/help"
            class="navbar-item has-divider is-desktop-icon-only"
            title="Помощь"
          >
            <b-icon icon="questionnaire-line" custom-size="default" />
            <span>Помощь</span>
          </nuxt-link>
          <a
            class="navbar-item is-desktop-icon-only"
            title="Выйти"
            @click="logout()"
          >
            <b-icon icon="logout-box-r-line" custom-size="default" />
            <span>Выйти</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close-line' : 'more-2-fill'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'menu-fold-line' : 'menu-unfold-line'
    },
    darkModeToggleIcon() {
      return this.isDarkModeActive ? 'sun-fill' : 'moon-clear-line'
    },
    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded',
      'isDarkModeActive',
    ]),
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    darkModeToggle() {
      this.$store.commit('darkModeToggle')
    },
    logout() {
      this.$auth.logout()
      this.$buefy.toast.open({
        message: 'Вы успешно вышли',
      })
    },
  },
}
</script>
