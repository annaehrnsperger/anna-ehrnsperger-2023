<template>
  <article>
    <h2>Featured Products</h2>
    <ul class="grid grid-cols-2 gap-8">
      <ProductPreview
        v-for="featuredProduct in frontpage.featuredProducts"
        :key="featuredProduct.product._id"
        :product="featuredProduct.product"
      />
    </ul>

    <h2 class="pt-8">Collections</h2>

    <div
      v-for="collection in collectionsData"
      :key="collection.title"
      class="pb-8"
    >
      <h2>{{ collection.title }}</h2>

      <ul class="grid grid-cols-2 gap-8">
        <ProductPreview
          v-for="product in collection.products"
          :key="product.product._id"
          :product="product.product"
        />
      </ul>
    </div>
  </article>
</template>

<script>
import ProductPreview from '../components/ProductPreview.vue';
import { general, product } from '../utils/fragments';
import { seo } from '../utils/seo';

export default {
  components: { ProductPreview },
  layout: 'shop',
  async asyncData({ $sanity, $shopify }) {
    const collectionsData = [];

    await $shopify.collection.fetchAllWithProducts().then((collections) => {
      collections.forEach((collection) => {
        const coll = {
          title: collection.title,
          products: [],
        };

        collectionsData.push(coll);

        collection.products.forEach(async (product) => {
          const productData = await $sanity.fetch(productQuery(product.handle));
          coll.products.push(productData);
        });
      });
    });

    const data = await $sanity.fetch(query);
    const { general, frontpage } = data;

    return { general, frontpage, collectionsData };
  },
  head() {
    return seo(this.general);
  },
};

const query = `{
  ${general}
  "frontpage": *[_type == "frontpage"][0]{
    ...,
      featuredProducts[]{
      ...,
        product->{
          ${product}
        }
    }
  },
}`;

const productQuery = (slug) => `{
  "product": *[_type == "product" && store.slug.current == "${slug}"][0]{
    ${product}
  }
}`;
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
