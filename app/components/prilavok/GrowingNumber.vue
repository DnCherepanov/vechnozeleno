<template>
  <div>{{ prefix }}{{ newValueFormatted }}{{ suffix }}</div>
</template>

<script>
export default {
  name: 'GrowingNumber',
  props: {
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      newValue: 0,
      step: 0,
    }
  },
  computed: {
    newValueFormatted() {
      return this.newValue
    },
  },
  watch: {
    value() {
      this.growInit()
    },
  },
  mounted() {
    this.growInit()
  },
  methods: {
    growInit() {
      const m = this.value / (this.duration / 25)
      this.grow(m)
    },
    grow(m) {
      const v = Math.ceil(this.newValue + m)

      if (v > this.value) {
        this.newValue = this.value
        return false
      }

      this.newValue = v
      setTimeout(() => {
        this.grow(m)
      }, 25)
    },
  },
}
</script>
