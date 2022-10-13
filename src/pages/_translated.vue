<template>
  <div v-if="page._type === 'overviewPage'">
    <h1>Journal</h1>
  </div>
  <div v-else>
    <h1>{{ page.title[$i18n.locale] }}</h1>
  </div>
</template>

<script>
import { LANGUAGES } from '../utils/constants';
import { general } from '../utils/fragments';

export default {
  async asyncData({ params, $sanity, store, error }) {
    const data = await $sanity.fetch(query(params.page));

    if (data.page) {
      await store.dispatch('i18n/setRouteParams', {
        en: { page: `${data.page.slug.en.current}` },
        de: { page: `${data.page.slug.de.current}` },
      });

      return data;
    } else {
      error({ statusCode: 404 });
    }
  },
  created() {
    this.$store.dispatch('setNavItems', {
      navItems: this.general?.navigation.pages,
    });
  },
};

const checkLangsWithSlug = (slug) => {
  const bla = LANGUAGES.map(
    (locale) => `slug["${locale}"].current == "${slug}"`
  );

  return '(' + bla.join(' || ') + ')';
};

const query = (slug) => `{
  ${general}
  "page": 
  *[_type == "page" && ${checkLangsWithSlug(slug)} || 
  _type == "overviewPage" && ${checkLangsWithSlug(slug)}][0]{
    ...
  },
}`;
</script>
