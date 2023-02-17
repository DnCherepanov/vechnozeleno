export const state = () => ({
  items: [],
  checkoutStatus: null,
})

export const getters = {
  cartProducts: (state) => {
    return state.items
  },

  cartTotalPrice: (state) => {
    return state.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  },
}

export const actions = {
  addProductToCart({ state, commit }, product) {
    commit('SET_CHECKOUT_STATUS', null)
    if (product.stock > 0) {
      const cartItem = state.items.find((item) => item.id === product.id)
      if (!cartItem) {
        commit('PUSH_PRODUCT_TO_CART', {
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          cover: product.cover,
          option: product.option,
          quantity: product.quantity,
          stock: product.stock,
        })
      } else {
        commit('INCREMENT_ITEM_QUANTITY', cartItem)
      }
    }
  },

  isProductAdded(product) {
    return state.items.find((item) => item.id === product._id)
  },

  deleteItem({ commit }, id) {
    commit('DELETE_ITEM', id)
  },

  clearCart({ commit }) {
    commit('DELETE_ALL_ITEMS', { items: [] })
  },
}

export const mutations = {
  PUSH_PRODUCT_TO_CART(
    state,
    { id, title, price, discount, cover, option, quantity, stock }
  ) {
    price = price - price * (discount / 100)
    state.items.push({
      id,
      title,
      price,
      discount,
      cover,
      option,
      quantity,
      stock,
    })
  },

  INCREMENT_ITEM_QUANTITY(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id)
    cartItem.quantity++
  },

  SET_CART_ITEMS(state, { items }) {
    state.items = items
  },

  SET_CHECKOUT_STATUS(state, status) {
    state.checkoutStatus = status
  },

  DELETE_ITEM(state, id) {
    const item = state.items.findIndex((item) => item.id === id)
    state.items.splice(item, 1)
  },

  DELETE_ALL_ITEMS(state, { items }) {
    state.items = items
  },
}
