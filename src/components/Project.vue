<template>
  <li
    class="duration-400 delay-[25ms] ease-out-quint"
    :class="{ 'dot-padding': activeProject, 'text-gray': !isActive }"
    data-project
    @mouseenter="$emit('mouseenter')"
  >
    <a :href="project.url" target="_blank" rel="noopener noreferrer" class="grid-layout | block pb-[5px]" data-fade-out>
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
import Dot from './Partials/Dot.vue';

export default {
  components: { Dot },
  props: {
    project: Object,
    activeProject: [Boolean, Number],
    activeCategory: String,
  },
  data() {
    return {
      isActive: true,
      categories: this.project.tags.map((category) => category.title),
    };
  },
  watch: {
    activeCategory() {
      if (!this.activeCategory) {
        this.isActive = true;
      } else {
        this.isActive = this.categories.includes(this.activeCategory);
      }
    },
  },
};
</script>
