export const actions = {
  async createCertificate({ commit }, formData) {
    try {
      await this.$axios.$post('/api/certificate', formData)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async createContactUs({ commit }, formData) {
    try {
      await this.$axios.$post('/api/contactUs', formData)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
}
