<template>
  <article class="h-screen flex flex-col">
    <section class="grid-layout | p-6 pt-4 md:p-12 md:pt-9" @mouseenter="moveProjectsDown" @touchstart="moveProjectsDown">
      <div class="col-span-full lg:col-span-full">
        <h1 class="duration-400 delay-[25ms] ease-out-quint" :class="{ 'pl-[32px]': activeProject === undefined }">
          <span class="relative">
            <Dot :show="activeProject === undefined" :is-logo="true" />
            <span>Anna Ehrnsperger</span>
          </span>
        </h1>
        <h2>
          Designer and Web Developer creating unique, high-quality websites.
          <br />
          I strive for beautiful execution and great user experience.
        </h2>
        <a href="mailto:hallo@annaehrnsperger.de">Let’s create something together.</a>
      </div>
    </section>

    <section
      ref="projectsSection"
      class="hide-scrollbar projects-section | fixed top-projects w-full overflow-y-scroll bg-black text-white"
      @mouseenter="moveProjectsUp"
      @touchstart="moveProjectsUp"
    >
      <div class="grid-layout">
        <div
          class="
            small
            hide-scrollbar
            |
            overflow-x-scroll
            md:overflow-auto md:text-gray
            flex
            md:flex-wrap md:pb-32
            col-span-full
            md:col-start-13 md:col-span-12
            py-6
            md:pt-9
          "
        >
          <CategoryBtn v-for="(category, i) in categories" :key="category._id" :category="category" :i="i" />
        </div>
      </div>

      <ul class="p-6 md:p-12 md:pt-0">
        <Project
          v-for="(project, i) in projects"
          :key="project._id"
          :project="project"
          :active-project="activeProject === i"
          @mouseenter="onProjectHover(i)"
        />
      </ul>

      <div class="grid-layout small | p-6 pt-[200px] md:p-12 md:pt-[200px]">
        <div class="col-span-full md:col-span-11">
          <PortableText :blocks="legal.text" />
        </div>
      </div>
    </section>

    <section ref="previewSection" class="grid-layout | p-6 md:p-12 fixed inset-0 w-full h-full pointer-events-none">
      <div class="relative col-start-6 col-span-7 md:col-start-17 md:col-span-8 mt-auto aspect-square">
        <figure
          v-for="(project, i) in projects"
          :key="project._id"
          class="dark-shadow | absolute inset-0 opacity-0"
          :class="{ 'opacity-100': activePreview === i }"
        >
          <Img :asset="project.preview.image" :alt="project.preview.alt" />
        </figure>
      </div>
    </section>
  </article>
</template>

<script>
import once from 'just-once';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Partials/Img.vue';
import { general, image } from '../utils/fragments';
import { seo } from '../utils/seo';
import CategoryBtn from '../components/Partials/CategoryBtn.vue';
import Project from '../components/Project.vue';
import PortableText from '../components/Partials/PortableText.vue';
import { selectAll } from '../utils/helper';
import Dot from '../components/Partials/Dot.vue';

export default {
  components: { Img, CategoryBtn, Project, PortableText, Dot },
  async asyncData({ $sanity }) {
    return await $sanity.fetch(query);
  },
  data() {
    return {
      activeProject: undefined,
      activePreview: 0,
      initialProjectsPos: 120,
    };
  },
  head() {
    return seo(this.general);
  },
  mounted() {
    const { projectsSection, previewSection } = this.$refs;
    gsap.set([projectsSection, previewSection], { y: this.initialProjectsPos });

    window.addEventListener('wheel', once(this.moveProjectsUp));
    window.addEventListener('touchstart', once(this.moveProjectsUp));
  },
  methods: {
    initScrollTrigger() {
      gsap.registerPlugin(ScrollTrigger);

      const projects = selectAll('[data-project]');

      const mm = gsap.matchMedia();
      const breakPoint = 900;

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          if (isMobile) {
            projects.forEach((project, i) => {
              ScrollTrigger.create({
                scroller: this.$refs.projectsSection,
                trigger: project,
                start: 'top 75px',
                end: 'bottom 75px',
                onToggle: ({ isActive }) => {
                  if (isActive) this.onProjectHover(i);
                },
              });
            });

            return () => ScrollTrigger.killAll();
          }
        }
      );
    },
    moveProjectsUp() {
      this.initScrollTrigger();

      const { projectsSection, previewSection } = this.$refs;

      this.activeProject = 0;

      gsap.killTweensOf([projectsSection, previewSection]);
      gsap.to([projectsSection, previewSection], {
        y: 0,
        ease: 'expo.inOut',
        duration: 0.6,
        onStart: () => window.removeEventListener('wheel', this.moveProjectsUp),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    moveProjectsDown() {
      const { projectsSection, previewSection } = this.$refs;

      this.activeProject = undefined;

      gsap.killTweensOf([projectsSection, previewSection]);
      gsap.to([projectsSection, previewSection], { y: this.initialProjectsPos, ease: 'expo.out', duration: 1 });
    },
    onProjectHover(i) {
      this.activeProject = i;
      this.activePreview = i;
    },
  },
};

const query = `{
  ${general}
  "projects": *[_type == "project"]|order(orderRank desc)[]{
    ...,
    preview{
      ...,
      ${image}
    },
    tags[]->
  },
  "categories": *[_type == "category"]|order(title asc),
  "legal": *[_type == "legal"][0]
}`;
</script>

<style>
.projects-section {
  height: calc(100vh - var(--projects-top));
  box-shadow: 0px 10px 30px 10px hsl(0, 0%, 25%);
}

.dark-shadow {
  box-shadow: 0px 0px 40px 20px hsla(0, 0%, 0%, 0.816);
}
</style>
