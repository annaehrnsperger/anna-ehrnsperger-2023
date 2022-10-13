<template>
  <div>
    <h1>{{ data.collection.store.title }}</h1>

    <ul class="grid grid-cols-2 gap-8">
      <ProductPreview
        v-for="product in products"
        :key="product.product._id"
        :product="product.product"
      />
    </ul>
  </div>
</template>

<script>
import ProductPreview from '../../components/ProductPreview.vue';
import { general, product } from '../../utils/fragments';
import { seo } from '../../utils/seo';

export default {
  components: { ProductPreview },
  layout: 'shop',
  async asyncData({ params: { collection }, $sanity, $shopify, error }) {
    const data = await $sanity.fetch(query(collection));

    const shopifyCollection = await $shopify.collection.fetchWithProducts(
      data.collection.store.gid
    );

    const products = await Promise.all(
      shopifyCollection.products.map(async (product) => {
        return await $sanity.fetch(productQuery(product.handle));
      })
    );

    if (data.collection) {
      return { data, products };
    }

    error({ statusCode: 404 });
  },
  head() {
    return seo(this.data.general, this.data.collection.store.title);
  },
};

const query = (slug) => `{
  ${general}
  "collection": *[_type == "collection" && store.slug.current == "${slug}"][0]{
    ...
  }
}`;

const productQuery = (slug) => `{
  "product": *[_type == "product" && store.slug.current == "${slug}"][0]{
    ${product}
  }
}`;
</script>
