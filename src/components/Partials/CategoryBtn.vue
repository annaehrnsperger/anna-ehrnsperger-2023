<template>
  <button class="group pr-8 pb-4 flex-none" :class="{ 'pl-8 md:pl-0': i === 0 }" @click="handleBtn">
    <span
      class="
        h-[8px]
        w-[8px]
        inline-block
        rounded-full
        -translate-y-[0.5px]
        border border-white
        md:border-gray
        border-solid
        md:group-hover:bg-gray
        duration-150
      "
      :class="{ 'bg-white md:bg-gray': isActive, 'bg-transparent': !isActive }"
    />
    <span>{{ category.title }}</span>
  </button>
</template>

<script>
export default {
  props: {
    category: Object,
    i: Number,
  },
  data() {
    return {
      isActive: false,
    };
  },
  watch: {
    '$store.getters.activeCategories'() {
      if (this.$store.getters.activeCategories.length === 0) this.isActive = false;
    },
  },
  methods: {
    handleBtn() {
      this.isActive = !this.isActive;

      if (this.isActive && !this.$store.getters.activeCategories.includes(this.category.title))
        this.$store.commit('addCategory', { value: this.category.title });

      if (!this.isActive) this.$store.commit('removeCategory', { value: this.category.title });
    },
  },
};
</script>
