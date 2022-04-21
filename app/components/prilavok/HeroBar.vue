<template>
  <section class="hero is-hero-bar">
    <div class="hero-body">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <a role="button" @click.prevent="goBack">
              <b-icon icon="arrow-left-line" />
            </a>
          </div>
          <div class="level-item">
            <h1 class="title is-size-4-mobile">
              <slot />
            </h1>
          </div>
        </div>
        <div v-show="hasRightVisible" class="level-right">
          <div class="buttons level-item">
            <slot name="right" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBar',
  props: {
    hasRightVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.level-left {
  align-items: baseline;
}
</style>
