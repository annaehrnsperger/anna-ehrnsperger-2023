<template>
  <img
    class="lazyload"
    :src="`${asset}&width=2`"
    :data-src="asset"
    :alt="alt"
  />
</template>

<script>
import 'lazysizes'

export default {
  props: {
    asset: String,
    alt: {
      type: String,
      default: 'Meaningful Product Description',
    },
  },
}
</script>

<style scoped>
img {
  @apply w-full h-full object-cover;
}
</style>
