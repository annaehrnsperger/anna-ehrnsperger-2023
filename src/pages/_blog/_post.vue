<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ transformDate }}</p>
    <PortableText :blocks="post.content" />
  </div>
</template>

<script>
import PortableText from '../../components/Partials/PortableText.vue'
import { general } from '../../utils/fragments'
import { seo } from '../../utils/seo'

export default {
  components: { PortableText },
  async asyncData({ params: { post }, $sanity, error }) {
    const data = await $sanity.fetch(query(post))

    if (data.post) {
      return data
    }

    error({ statusCode: 404 })
  },
  head() {
    return seo(this.general, this.post.title)
  },
  computed: {
    transformDate() {
      const date = new Date(this.post.date)

      return `${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getDate()}, ${date.getFullYear()}`
    },
  },
  created() {
    this.$store.dispatch('setNavItems', {
      navItems: this.general.navigation.pages,
    })
  },
}

const query = (slug) => `{
  ${general}
  "post": *[_type == "post" && slug.current == "${slug}"][0]{
    ...
  }
}`
</script>
