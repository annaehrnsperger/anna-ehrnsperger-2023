<template>
  <img
    class="lazyload"
    :class="{
      portrait: Number(dimensions.width) < Number(dimensions.height),
      landscape: Number(dimensions.width) > Number(dimensions.height),
    }"
    :height="dimensions.height"
    :width="dimensions.width"
    :src="lazySrc"
    :data-src="src"
    :data-srcset="srcSet"
    data-sizes="auto"
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
      default: 'Meaningful Image Description',
    },
  },
  computed: {
    lazySrc() {
      return this.$urlFor(this.asset).width(100).blur(50).url()
    },
    src() {
      return this.$urlFor(this.asset).auto('format').url()
    },
    srcSet() {
      const WIDTHS = [600, 1200, 2400]

      const srcSet = WIDTHS.map((width) => {
        return `${this.$urlFor(this.asset)
          .width(width)
          .auto('format')
          .fit('max')
          .url()} ${width}w`
      })

      return srcSet.join(',')
    },
    dimensions() {
      const dimensions = this.asset.split('-')[1].split('x')
      const width = dimensions[0]
      const height = dimensions[1].split('.')[0]

      return { width, height }
    },
  },
}
</script>

<style scoped>
img {
  @apply w-full h-full object-cover;
}
</style>
