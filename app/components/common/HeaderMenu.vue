<template>
  <NuxtLink
    :to="{ name: 'catalog-slug', params: { title, slug } }"
    class="navbar-item"
    @click.native="passEvent"
  >
    {{ title }}
  </NuxtLink>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    passEvent() {
      this.$emit('closeBurger')
    },
  },
}
</script>
