export const state = () => ({
  orders: [],
})
export const getters = {
  sold: ({ orders }) => {
    return orders.length
  },
  total: ({ orders }) => {
    return orders.reduce((acc, { totalPrice }) => acc + totalPrice, 0)
  },
  average: (state, getters) => {
    return Math.floor(getters.total / getters.sold)
  },
}
export const actions = {
  // Создаем заказ
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/prilavok/order', formData)
      commit('cart/SET_CART_ITEMS', { items: [] }, { root: true })
    } catch (error) {
      const message = Object.values(error.response.data)[0].message
      commit('setError', message, { root: true })
      throw error
    }
  },
  // Обновляем заказ
  async update({ commit }, payload) {
    try {
      return await this.$axios.$put(
        `/api/prilavok/order/${payload._id}`,
        payload
      )
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  // Запрашиваем список заказов
  async getOrders({ commit }) {
    try {
      const orders = await this.$axios.$get('/api/prilavok/orders')
      commit('SET_ORDERS', orders)
    } catch (err) {
      commit('setError', err, { root: true })
    }
  },
  // Запрашиваем заказ
  async getOrder({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/prilavok/order/${id}`)
    } catch (error) {
      commit('setError', error, { root: true })
    }
  },
  // Запрашиваем заказ для удаления
  async remove({ commit }, id) {
    try {
      await this.$axios.$delete(`/api/prilavok/order/${id}`)
      commit('DELETE_ORDER', id)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}

export const mutations = {
  // Мутируем список заказов
  SET_ORDERS(state, orders) {
    state.orders = orders
  },

  // Удаляем заказ
  DELETE_ORDER(state, id) {
    const index = state.orders.findIndex((item) => item._id === id)
    state.orders.splice(index, 1)
  },
}
