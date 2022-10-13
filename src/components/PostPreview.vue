<template>
  <Transition>
    <li v-if="isActive" class="ease-out-quint duration-2000">
      <NuxtLink :to="`/${blog.slug.current}/${post.slug.current}`">
        <h2>{{ post.title }}</h2>

        <figure class="aspect-square overflow-hidden">
          <Img :asset="post.image" :alt="post.alt" />
        </figure>
      </NuxtLink>
    </li>
  </Transition>
</template>

<script>
import { compareArrays } from '../utils/helper'
import Img from './Partials/Img.vue'

export default {
  components: { Img },
  props: {
    blog: Object,
    post: Object,
  },
  data() {
    return {
      isActive: true,
      categories: this.post.filter.map((category) => category.title),
    }
  },
  watch: {
    '$store.getters.activeCategories'() {
      this.isActive = compareArrays(
        this.$store.getters.getCategories,
        this.categories
      )
    },
  },
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
