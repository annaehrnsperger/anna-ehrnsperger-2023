<template>
  <header
    class="flex justify-between duration-1200 ease-out-expo p-8 fixed w-full z-10"
    :class="{ 'bg-gray': isGray, 'bg-white': !isGray }"
  >
    <NuxtLink to="/">
      <h1>Baustelle</h1>
    </NuxtLink>

    <NavDesktop />

    <NavBtn :is-nav-open="isNavOpen" @click="isNavOpen = !isNavOpen" />
    <NavMobile :is-nav-open="isNavOpen" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      isGray: false,
      isNavOpen: false,
    }
  },
}
</script>
