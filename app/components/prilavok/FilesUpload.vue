<template>
  <section>
    <b-field>
      <b-upload v-model="dropFiles" multiple drag-drop expanded @input="upload">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload-cloud-2-line" size="is-large"></b-icon>
            </p>
            <p>Перетащите изображения или нажмите для загрузки</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span
        v-for="(item, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ item.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropFiles: [],
    }
  },
  methods: {
    upload(dropFiles) {
      this.$emit('input', dropFiles)
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
  },
}
</script>
