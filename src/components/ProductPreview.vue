<template>
  <NuxtLink :to="'/products/' + product.slug">
    <h1>{{ product.title }}</h1>

    <figure>
      <ShopifyImg :asset="product.image" :alt="product.title" />
    </figure>

    <p>{{ product.price }} €</p>
  </NuxtLink>
</template>

<script>
import ShopifyImg from './Partials/ShopifyImg.vue'
export default {
  components: { ShopifyImg },
  props: {
    product: Object,
  },
}
</script>
