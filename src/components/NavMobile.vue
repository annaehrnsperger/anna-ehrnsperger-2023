<template>
  <Transition>
    <nav
      v-if="isNavOpen"
      id="mobile-nav"
      class="fixed inset-0 bg-white w-full h-full p-8 pt-24 md:hidden duration-400 ease-out-quint z-[-1]"
    >
      <ul class="flex flex-col space-y-8">
        <li v-for="item in navItems" :key="item._id">
          <NuxtLink
            class="duration-400 ease-out-quint"
            :class="{ frontpage: !item.slug }"
            :to="'/' + (item.slug || '')"
            >{{ item.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script>
export default {
  props: {
    general: Object,
    isNavOpen: Boolean,
  },
  data() {
    return {
      navItems: this.$store.state.navItems.navItems,
    }
  },
  methods: {
    onEnter() {
      console.log(123)
    },
  },
}
</script>

<style scoped>
.nuxt-link-exact-active,
.nuxt-link-active:not(.frontpage) {
  @apply text-white bg-black rounded-full p-2 px-4;
}

.v-enter-active {
  @apply -translate-y-full;
}

.v-enter-from {
  @apply translate-y-0;
}

.v-leave-to {
  @apply -translate-y-full;
}
</style>
