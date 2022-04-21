<template>
  <div :class="containerClass">
    <slot
      v-for="(feed, index) in feeds"
      :index="index"
      :feed="feed"
      name="feeds"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    // Class for container div
    containerClass: {
      type: String,
      default: '',
      required: false,
    },
  },
  async fetch() {
    await this.$store.dispatch('getFeed', this.fields)
  },
  computed: {
    ...mapState({
      feeds: (state) => state.feeds,
    }),
  },
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .instagram {
    overflow-x: scroll;
  }
  .instagram .column {
    flex: none;
    width: 29%;
    padding: 0.75rem 0.5rem;
  }
}
</style>
