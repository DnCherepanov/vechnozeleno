<template>
  <main>
    <section class="section">
      <div class="container">
        <BlogArticle
          v-for="article in articles"
          :id="article._id"
          :key="article._id"
          :title="article.title"
          :image="article.photo"
          :intro="article.intro"
          :reading-time="article.readingTime"
          :tags="article.tags"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import BlogArticle from '@/components/blog/BlogArticle'
export default {
  components: {
    BlogArticle,
  },
  async fetch() {
    await this.$store.dispatch('article/getArticles')
  },
  head() {
    const title = 'Блог'
    const description = 'Блог онлайн экомаркета Pourtoi'
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('article', ['articles']),
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}
.media-content {
  overflow: hidden;
}
</style>
