<template>
  <button class="group pr-8 pb-4 flex-none" :class="{ 'pl-8 md:pl-0': i === 0 }" @click="$emit('click')">
    <BtnDot :is-active="activeCategory === title" />
    <span class="pl-[1px] md:p-0">{{ title }}</span>
  </button>
</template>

<script>
import BtnDot from './BtnDot.vue';
export default {
  components: { BtnDot },
  props: {
    i: Number,
    title: String,
    activeCategory: String,
  },
};
</script>
