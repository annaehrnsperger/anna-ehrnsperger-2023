<template>
  <button :class="classNames" @click="handleBtn">{{ category.title }}</button>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    classNames() {
      if (!this.isActive || this.$store.getters.activeCategories.length === 0)
        return 'no-underline'

      return 'underline'
    },
  },
  watch: {
    '$store.getters.activeCategories'() {
      if (this.$store.getters.activeCategories.length === 0)
        this.isActive = false
    },
  },
  methods: {
    handleBtn() {
      this.isActive = !this.isActive

      if (
        this.isActive &&
        !this.$store.getters.activeCategories.includes(this.category.title)
      )
        this.$store.commit('addCategory', { value: this.category.title })

      if (!this.isActive)
        this.$store.commit('removeCategory', { value: this.category.title })
    },
  },
}
</script>
