<template>
  <nav class="space-x-4 hidden md:block">
    <NuxtLink
      v-for="item in navItems"
      :key="item._id"
      class="duration-400 ease-out-quint"
      :class="{ frontpage: !item.slug }"
      :to="'/' + (item.slug || '')"
      aria-label="logo"
      >{{ item.title }}</NuxtLink
    >
  </nav>
  <!-- <nav class="space-x-4 hidden md:block">
    <NuxtLink
      v-for="item in navItems"
      :key="item._id"
      class="duration-400 ease-out-quint"
      :class="{ frontpage: !item.slug[$i18n.locale].current }"
      :to="'/' + (item.slug[$i18n.locale].current || '')"
      aria-label="logo"
      >{{ item.title[$i18n.locale] }}</NuxtLink
    >
  </nav> -->
</template>

<script>
export default {
  props: {
    general: Object,
  },
  data() {
    return {
      navItems: this.$store.state.navItems.navItems,
    };
  },
};
</script>

<style scoped>
.nuxt-link-exact-active,
.nuxt-link-active:not(.frontpage) {
  @apply text-white bg-black rounded-full p-2 px-4;
}
</style>
