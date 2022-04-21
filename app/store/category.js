export const state = () => ({
  categories: [],
  products: [],
  current: {},
})

export const getters = {
  categories: (state) => {
    const parents = state.categories.filter(
      (category) => category.parent === '/'
    )
    return parents.map((parent) => {
      const subs = state.categories.filter(
        (categories) => categories.parent === parent.path
      )
      return {
        _id: parent._id,
        title: parent.title,
        slug: parent.slug,
        path: parent.path,
        subs,
      }
    })
  },
  titleSlugPath: (state) => {
    return state.categories.map((category) => {
      return {
        title: category.title,
        slug: category.slug,
        path: category.path,
      }
    })
  },
  activeProducts: (state) => {
    return state.products.filter((product) => product.isActive)
  },
}
export const mutations = {
  // Мутируем список категорий
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  // Мутируем категорию
  SET_CURRENT(state, category) {
    state.current = category
  },

  // Загружаем список товаров
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  // Добавляем категорию
  ADD_CATEGORY(state, category) {
    state.categories.push(category)
  },

  // Удаляем категорию
  DELETE_CATEGORY(state, id) {
    const index = state.categories.findIndex((c) => c._id === id)
    state.categories.splice(index, 1)
  },
}
export const actions = {
  // Создаем категорию
  async create({ commit }, formData) {
    try {
      const category = await this.$axios.$post(
        '/api/prilavok/category',
        formData
      )
      commit('ADD_CATEGORY', category)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },

  // Обновляем категорию
  async update({ commit }, formData) {
    try {
      return await this.$axios.$put(
        `/api/prilavok/category/${formData._id}`,
        formData
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Получаем список категорий
  async getCategories({ commit }) {
    try {
      const categories = await this.$axios.$get('/api/categories')
      commit('SET_CATEGORIES', categories)
    } catch (err) {
      commit('setError', err, { root: true })
    }
  },

  // Получаем текущую категорию
  async getCategoryProducts({ commit }, slug) {
    try {
      const products = await this.$axios.$get(`/api/category/${slug}`)
      commit('SET_PRODUCTS', products)
    } catch (err) {
      commit('setError', err, { root: true })
    }
  },

  // Получаем текущую категорию в админке
  async getAdminCategory({ commit }, id) {
    try {
      const category = await this.$axios.$get(`/api/prilavok/category/${id}`)
      commit('SET_CURRENT', category)
    } catch (err) {
      commit('setError', err, { root: true })
    }
  },

  // Удаляем категорию
  async remove({ commit }, trashObject) {
    try {
      await this.$axios.$delete(`/api/prilavok/category/${trashObject._id}`, {
        data: { path: trashObject.path },
      })
      commit('DELETE_CATEGORY', trashObject._id)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}
