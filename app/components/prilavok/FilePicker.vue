<template>
  <b-field>
    <b-field class="file is-primary">
      <b-upload
        v-model="file"
        :accept="accept"
        class="file-label"
        rounded
        @input="upload"
      >
        <span class="file-cta">
          <b-icon icon="upload-line"></b-icon>
          <span class="file-label pl-2">{{ buttonLabel }}</span>
        </span>
      </b-upload>
    </b-field>
  </b-field>
</template>

<script>
export default {
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      file: null,
    }
  },
  computed: {
    buttonLabel() {
      return !this.file ? 'Загрузить превью' : this.file.name
    },
  },
  methods: {
    upload(file) {
      this.$emit('input', file)
    },
  },
}
</script>
<style>
.file-name {
  border: none;
}
</style>
