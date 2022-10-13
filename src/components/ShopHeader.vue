<template>
  <header class="flex justify-between p-8">
    <NuxtLink to="/">
      <h1>Baustelle</h1>
    </NuxtLink>

    <button :class="{ 'opacity-50': loading }" @click="handleCart">
      Cart ({{ loading ? ' ' : cartCount }})
    </button>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('checkout', ['cartCount', 'loading']),
  },
  methods: {
    ...mapActions('checkout', ['handleCart']),
  },
};
</script>
