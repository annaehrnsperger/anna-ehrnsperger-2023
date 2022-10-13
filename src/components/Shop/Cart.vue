<template>
  <section
    v-if="isCartOpen"
    class="fixed inset-0 w-full h-screen flex justify-end"
  >
    <div
      class="absolute inset-0 bg-black opacity-25 cursor-pointer"
      @click="handleCart"
    ></div>

    <div class="w-1/3 bg-white z-10 p-8 h-full flex justify-between flex-col">
      <div>
        <button class="text-right" @click="handleCart">Close</button>

        <div v-if="lineItems?.length !== 0">
          <ul>
            <CartItem v-for="item in lineItems" :key="item.id" :item="item" />
          </ul>
        </div>

        <p v-else>Your cart is empty</p>
      </div>

      <div>
        <div class="flex justify-between">
          <a v-if="lineItems?.length !== 0" :href="checkout?.webUrl"
            >Checkout</a
          >
          <p>{{ total }}</p>
        </div>

        <p>Shipping, taxes, and discounts will be calculated at checkout.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { convertPrice } from '../../utils/helper';
import CartItem from '../Shop/CartItem.vue';

export default {
  components: { CartItem },
  computed: {
    ...mapGetters('checkout', [
      'loading',
      'lineItems',
      'isCartOpen',
      'checkout',
    ]),
    total() {
      return convertPrice(this.checkout.totalPrice);
    },
  },
  methods: {
    ...mapActions('checkout', ['handleCart']),
  },
};
</script>
