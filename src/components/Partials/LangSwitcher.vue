<template>
  <ul class="flex space-x-4">
    <li v-for="locale in $i18n.locales" :key="locale">
      <NuxtLink :to="switchLocalePath(locale)">{{
        locale.toUpperCase()
      }}</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.nuxt-link-exact-active {
  @apply underline;
}
</style>
