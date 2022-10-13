<template>
  <div>
    <h1>{{ product.title }}</h1>

    <figure class="w-[200px]">
      <ShopifyImg :asset="product.image" :alt="product.title" />
    </figure>

    <p>{{ product.variants[0].price }} €</p>

    <div v-if="product.variants.length !== 1" class="flex space-x-8">
      <button
        v-for="(variant, i) in product.variants"
        :key="variant.id"
        :class="{ underline: i === activeVariant }"
        @click="handleVariant(i)"
      >
        {{ variant.title }}
      </button>
    </div>

    <button :class="{ loading: loading }" @click="addToCart">
      Add to cart
    </button>
  </div>
</template>

<script>
import ShopifyImg from '../../components/Partials/ShopifyImg.vue';
import { general, product } from '../../utils/fragments';
import { seo } from '../../utils/seo';

export default {
  components: { ShopifyImg },
  layout: 'shop',
  async asyncData({ params: { product }, $sanity, error }) {
    const data = await $sanity.fetch(query(product));

    if (data.product) {
      return data;
    }

    error({ statusCode: 404 });
  },
  data() {
    return {
      variantId: '',
      activeVariant: 0,
      loading: false,
    };
  },
  head() {
    return seo(this.general, this.product.title);
  },
  mounted() {
    this.variantId = this.product.variants[0].id;
  },
  methods: {
    handleVariant(i) {
      this.variantId = this.product.variants[i].id;
      this.activeVariant = i;
    },
    async addToCart() {
      this.loading = true;

      await this.$store.dispatch('checkout/addItemToCheckout', {
        variantId: Buffer.from(
          `gid://shopify/ProductVariant/${this.variantId}`
        ).toString('base64'),
        quantity: 1,
      });

      this.loading = false;
    },
  },
};

const query = (slug) => `{
  ${general}
  "product": *[_type == "product" && store.slug.current == "${slug}"][0]{
    ${product}
  }
}`;
</script>

<style scoped>
.loading {
  @apply opacity-50 pointer-events-none;
}
</style>
