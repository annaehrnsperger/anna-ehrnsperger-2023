<template>
  <li :class="{ 'opacity-50': loading }" class="flex py-8 w-full">
    <figure class="w-[70px] aspect-square">
      <ShopifyImg :asset="item.variant.image.src" />
    </figure>

    <div class="pl-8 w-full">
      <div class="flex justify-between">
        <p>{{ item.title }}</p>
        <p>{{ price }}</p>
      </div>

      <div class="flex">
        <button
          :class="{ loading: loadingQuantity }"
          @click="updateQuantity(item.quantity - 1)"
        >
          –
        </button>

        <p>{{ item.quantity }}</p>

        <button
          :class="{ loading: loadingQuantity }"
          @click="updateQuantity(item.quantity + 1)"
        >
          +
        </button>

        <button class="ml-8" @click="removeFromCart">remove</button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import { convertPrice } from '../../utils/helper';
import ShopifyImg from '../Partials/ShopifyImg.vue';

export default {
  components: { ShopifyImg },
  props: {
    item: Object,
  },
  data() {
    return {
      loading: false,
      loadingQuantity: false,
    };
  },
  computed: {
    ...mapGetters('checkout', ['lineItems']),
    price() {
      return convertPrice(this.item.variant.price * this.item.quantity);
    },
  },
  methods: {
    async removeFromCart() {
      this.loading = true;

      await this.$store.dispatch('checkout/removeLineItem', this.item.id);

      this.loading = false;
    },
    async updateQuantity(quantity) {
      this.loadingQuantity = true;

      await this.$store.dispatch('checkout/updateLineItem', {
        id: this.item.id,
        quantity,
      });

      this.loadingQuantity = false;
    },
  },
};
</script>

<style scoped>
.loading {
  @apply opacity-50 pointer-events-none;
}
</style>
