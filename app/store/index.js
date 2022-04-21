export const state = () => ({
  /* NavBar */
  isNavBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false,

  /* Dark mode */
  isDarkModeActive: false,

  /* Instagram feed */
  feeds: [],

  /* Error */
  error: null,
})

export const actions = {
  async getFeed({ commit }, payload) {
    try {
      const { data } = await this.$axios.get(
        `https://graph.instagram.com/me/media?access_token=${process.env.INSTAGRAM_TOKEN}&fields=media_url,media_type,permalink`
      )
      const photos = data.data
        .filter((photo) => photo.media_type !== 'VIDEO')
        .slice(0, 6)
      commit('SET_FEED', photos)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}

export const mutations = {
  /* A fit-them-all commit */
  basic(state, payload) {
    state[payload.key] = payload.value
  },

  // Загружаем список товаров
  SET_FEED(state, payload) {
    state.feeds = payload
  },

  /* Aside Mobile */
  asideMobileStateToggle(state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },

  /* Dark Mode */
  darkModeToggle(state, payload = null) {
    const htmlClassName = 'is-dark-mode-active'

    state.isDarkModeActive = !state.isDarkModeActive

    if (state.isDarkModeActive) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }
  },

  /* Error */
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  },
}
