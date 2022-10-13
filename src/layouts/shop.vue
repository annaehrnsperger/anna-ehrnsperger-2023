<template>
  <div id="root" class="flex flex-col min-h-screen">
    <ShopHeader />
    <Cart />

    <main class="p-8 pt-48 flex-1">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Cart from '../components/Shop/Cart.vue';
import ShopHeader from '../components/ShopHeader.vue';

export default {
  components: { Cart, ShopHeader },
  mounted() {
    if (localStorage.checkoutId) {
      this.$store.dispatch('checkout/fetchCheckout', localStorage.checkoutId);
    } else {
      this.$store.dispatch('checkout/createCheckout');
    }
  },
};
</script>
