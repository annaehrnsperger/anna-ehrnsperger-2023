<template>
  <li
    class="duration-400 delay-[25ms] ease-out-quint"
    :class="{ 'pl-[32px]': activeProject, 'text-gray': !isActive }"
    data-project
    @mouseenter="$emit('mouseenter')"
  >
    <a :href="project.url" target="_blank" rel="noopener noreferrer" class="grid-layout | block pb-[5px]">
      <span class="col-span-full md:col-span-11 relative">
        <Dot :show="activeProject" :active-category="isActive" />
        <span>{{ project.title }}</span>
      </span>

      <span class="text-darkgray hidden md:block md:col-start-13 md:col-span-12">
        With {{ project.collaborators || project.title }}{{ project.year ? ', ' + project.year : '' }}
      </span>
    </a>
  </li>
</template>

<script>
import { compareArrays } from '../utils/helper';
import Dot from './Partials/Dot.vue';

export default {
  components: { Dot },
  props: {
    project: Object,
    activeProject: [Boolean, Number],
  },
  data() {
    return {
      isActive: true,
      categories: this.project.tags.map((category) => category.title),
    };
  },
  watch: {
    '$store.getters.activeCategories'() {
      this.isActive = compareArrays(this.$store.getters.activeCategories, this.categories);
    },
  },
};
</script>