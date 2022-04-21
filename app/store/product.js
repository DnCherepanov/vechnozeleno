export const state = () => ({
  products: [],
  productsMainPage: [],
  current: {},
})

export const getters = {
  activeProducts: (state) => {
    return state.products.filter((product) => product.isActive)
  },
  activeMainPage: (state) => {
    return state.productsMainPage.filter((product) => product.isActive)
  },
}

export const mutations = {
  // Загружаем список товаров
  SET_PRODUCTS(state, products) {
    if (products.length > 9) {
      state.products = products
    } else {
      state.productsMainPage = products
    }
  },

  // Загружаем товар
  SET_CURRENT(state, product) {
    product.media.unshift(product.cover)
    state.current = product
  },

  // Добавляем категорию
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },

  // Удаляем товар
  DELETE_PRODUCT(state, id) {
    const index = state.products.findIndex((p) => p._id === id)
    state.products.splice(index, 1)
  },
}

export const actions = {
  // Создаем товар
  async create({ commit }, formData) {
    try {
      const fd = new FormData()
      fd.append('title', formData.title)
      fd.append('category[title]', formData.category.title)
      fd.append('category[slug]', formData.category.slug)
      fd.append('category[path]', formData.category.path)
      fd.append('description', formData.description)
      fd.append('specification', formData.specification)
      fd.append('size', JSON.stringify(formData.size))
      fd.append('color', JSON.stringify(formData.color))
      fd.append('netPrice', formData.netPrice)
      fd.append('grossPrice', formData.grossPrice)
      fd.append('discount', formData.discount)
      fd.append('stock', formData.stock)
      fd.append('isActive', formData.isActive)
      fd.append('cover', formData.cover)
      if (formData.media) {
        for (let i = 0; i < formData.media.length; i++) {
          fd.append('media', formData.media[i], formData.media.name)
        }
      }
      const product = await this.$axios.$post('/api/prilavok/product', fd)
      commit('ADD_PRODUCT', product)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  // Обновляем товар
  async update({ commit }, formData) {
    try {
      return await this.$axios.$put(
        `/api/prilavok/product/${formData._id}`,
        formData
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  // Запрашиваем список товаров
  async getProducts({ commit }, limit) {
    try {
      const products = await this.$axios.$get('/api/products', {
        params: {
          limit,
        },
      })
      commit('SET_PRODUCTS', products)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  // запрашиваем товар
  async getProduct({ commit }, id) {
    const product = await this.$axios.$get(`/api/product/${id}`)
    commit('SET_CURRENT', product)
  },
  // Запрашиваем товар в админке
  async fetchAdminById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/product/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  // Запрашиваем товар для удаления
  async remove({ commit }, id) {
    try {
      await this.$axios.$delete(`/api/prilavok/product/${id}`)
      commit('DELETE_PRODUCT', id)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}
