export const state = () => ({
  articles: [],
  current: {},
})

export const getters = {
  articles: (state) => state.articles,
  article: (state) => state.current,
}

export const mutations = {
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },

  SET_CURRENT(state, article) {
    state.current = article
  },

  ADD_ARTICLE(state, article) {
    state.articles.push(article)
  },

  DELETE_ARTICLE(state, id) {
    state.articles = state.articles.filter((article) => article._id !== id)
  },
}

export const actions = {
  async create({ commit }, data) {
    // Форматируем текст для отправки в телеграм
    const textForTelega = data.content
      .replaceAll('<p>', '')
      .replaceAll('</p>', '\n \n')
      .replaceAll('&nbsp;', ' ')

    const URI_API_TEXT = `https://api.telegram.org/bot${this.$config.telegaToken}/sendMessage`
    const URI_API_PHOTO = `https://api.telegram.org/bot${this.$config.telegaToken}/sendPhoto?&caption=${textForTelega}&parse_mode=HTML`

    // Подсчитываем количество времени необходиое для чтения статьи
    const wpm = 200
    const words = data.content.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)

    try {
      // Создаем форму для отправки
      const fd = new FormData()
      fd.append('chat_id', this.$config.telegaChatID)
      fd.append('title', data.title)
      fd.append('intro', data.intro)
      fd.append('content', data.content)
      fd.append('readingTime', time)
      if (data.tags) {
        for (let i = 0; i < data.tags.length; i++) {
          // eslint-disable-next-line security/detect-object-injection
          fd.append('tags', data.tags[i])
        }
      }

      // Отправляем сообщение в телеграм с фотографией
      if (data.photo) {
        fd.append('photo', data.photo)
        await this.$axios.post(URI_API_PHOTO, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        // Отправляем сообщение в телеграм без фотографии
        await this.$axios.post(URI_API_TEXT, {
          chat_id: this.$config.telegaChatID,
          parse_mode: 'HTML',
          text: textForTelega,
        })
      }

      const article = await this.$axios.$post('/api/prilavok/article', fd)
      commit('ADD_ARTICLE', article)
    } catch (error) {}
  },

  async getArticles({ commit }, limit) {
    try {
      const articles = await this.$axios.$get('/api/articles', {
        params: {
          limit,
        },
      })
      commit('SET_ARTICLES', articles)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async getArticle({ commit }, id) {
    try {
      const article = await this.$axios.$get(`/api/article/${id}`)
      commit('SET_CURRENT', article)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async remove({ commit }, article) {
    try {
      await this.$axios.$delete(`/api/prilavok/article/${article._id}`, {
        data: { photo: article.photo },
      })

      commit('DELETE_ARTICLE', article._id)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}
