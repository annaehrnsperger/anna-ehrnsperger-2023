<template>
  <div v-if="page._type === 'overviewPage'">
    <h1>Journal</h1>
  </div>
  <div v-else>
    <h1>{{ page.title }}</h1>
  </div>
</template>

<script>
import { general } from '../utils/fragments'

export default {
  async asyncData({ params, $sanity, error }) {
    const data = await $sanity.fetch(query(params.page))

    if (data.page) {
      return data
    } else {
      error({ statusCode: 404 })
    }
  },
  created() {
    this.$store.dispatch('setNavItems', {
      navItems: this.general?.navigation.pages,
    })
  },
}

const query = (slug) => `{
  ${general}
  "page": *[_type == "page" && slug.current == "${slug}" || _type == "overviewPage" && slug.current == "${slug}"][0]{
    ...
  },
}`
</script>
