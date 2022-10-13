<template>
  <section>
    <p>Home</p>
    <!-- <p>{{ frontpage.title[$i18n.locale] }}</p> -->

    <!-- <ul class="flex space-x-4 pb-8">
      <li>
        <AllBtn />
      </li>

      <li v-for="category in categories" :key="category._id">
        <CategoryBtn :category="category" />
      </li>
    </ul>

    <ul class="grid grid-cols-3 gap-8">
      <PostPreview
        v-for="post in posts"
        :key="post._id"
        :post="post"
        :blog="blog"
      />
    </ul> -->
  </section>
</template>

<script>
import AllBtn from '../components/Filter/AllBtn.vue';
import CategoryBtn from '../components/Filter/CategoryBtn.vue';
import PostPreview from '../components/PostPreview.vue';
import { LANGUAGES } from '../utils/constants';
import { general } from '../utils/fragments';
import { seo } from '../utils/seo';

export default {
  components: { AllBtn, CategoryBtn, PostPreview },
  // transition: {
  //   name: 'home',
  //   mode: 'out-in',
  //   enter(el) {
  //     console.log('enter', el)
  //   },
  //   leave(el) {
  //     console.log('leave', el)
  //   },
  // },
  async asyncData({ $sanity }) {
    return await $sanity.fetch(query);
  },
  head() {
    return seo(this.general);
  },
  created() {
    this.$store.dispatch('setNavItems', {
      navItems: this.general.navigation.pages,
    });
  },
  methods: {
    // localize(obj) {
    //   const defaultLang = LANGUAGES[0];
    //   return obj[this.$i18n.locale] || obj[defaultLang];
    // },
  },
};

const query = `{
  ${general}
  "posts": *[_type == "post"]|order(orderRank)[]{
    ...,
    'image': image.image.asset->url,
    filter[]->
  },
  "blog": *[_type == "overviewPage"][0],
  "categories": *[_type == "category"][],
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
