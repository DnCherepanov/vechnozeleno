<template>
  <b-image
    :src="`${productImage}-250`"
    src-fallback="/products/default-cover.svg"
    alt="Фото товара"
    :placeholder="`${productImage}-250?blur=10`"
    :responsive="false"
  />
</template>

<script>
export default {
  name: 'ProductCover',
  props: {
    productImage: {
      type: String,
      default: null,
    },
  },
}
</script>
