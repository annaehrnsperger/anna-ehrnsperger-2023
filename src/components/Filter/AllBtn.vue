<template>
  <button :class="classNames" @click="reset">All</button>
</template>

<script>
export default {
  computed: {
    classNames() {
      if (this.$store.getters.activeCategories.length === 0) {
        return 'underline'
      } else {
        return 'no-underline'
      }
    },
  },
  methods: {
    reset() {
      this.$store.commit('resetCategories')
    },
  },
}
</script>
