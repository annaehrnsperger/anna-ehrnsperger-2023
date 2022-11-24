<template>
  <article class="h-screen">
    <section
      ref="aboutSection"
      class="grid-layout | p-6 pt-5 md:p-12 md:pt-9 h-[90vh] md:h-screen flex flex-col items-center"
      @mouseenter="moveProjectsDown"
      @touchstart="moveProjectsDown"
    >
      <div ref="socials" class="grid-layout small | col-span-full pt-1 pb-12 md:p-0 md:fixed md:left-0 md:w-full md:top-10 opacity-0">
        <ul class="col-span-full md:col-start-13 md:col-span-12 flex">
          <li>
            <a href="mailto:hallo@annaehrnsperger.de" class="pr-8 group">
              <BtnDot :is-social="true" />
              <span class="pl-[1px] md:p-0">Email</span>
            </a>
          </li>
          <li v-for="social in socials" :key="social.title">
            <a :href="social.url" target="_blank" rel="noopener noreferrer" class="pr-8 group">
              <BtnDot :is-social="true" />
              <span class="pl-[1px] md:p-0">{{ social.title }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-full lg:col-span-full">
        <h1 class="duration-400 delay-[25ms] ease-out-quint" :class="{ 'dot-padding': activeProject === undefined && showIntroDot }">
          <span class="relative">
            <Dot :show="activeProject === undefined && showIntroDot" :is-logo="true" />
            <span>Anna Ehrnsperger</span>
          </span>
        </h1>
        <div>
          <h2>
            <span ref="introText" class="block opacity-0"
              >Digital Design, <br class="md:hidden" />
              Web Development</span
            >
            <span data-about-text class="block opacity-0">Designer and Web Developer creating unique, high-quality websites.</span>
            <span data-about-text class="block pt-6 md:pt-0 opacity-0">I strive for beautiful execution and great user experience.</span>
          </h2>
          <a data-about-text class="opacity-0" href="mailto:hallo@annaehrnsperger.de">Let’s create something together.</a>
        </div>
      </div>
    </section>

    <section
      ref="projectsSection"
      class="hide-scrollbar projects-section | top-projects fixed w-full overflow-y-hidden bg-black text-white pointer-events-none opacity-0"
      @mouseenter="moveProjectsUp"
      @touchstart="moveProjectsUp"
      @scroll="onScroll"
    >
      <div class="grid-layout" data-categories>
        <div
          class="small hide-scrollbar | overflow-x-scroll md:overflow-auto md:text-gray flex md:flex-wrap md:pb-32 col-span-full md:col-start-13 md:col-span-12 py-6 md:pt-11"
        >
          <CategoryBtn
            v-for="(category, i) in categories"
            :key="category._id"
            :i="i"
            :title="category.title"
            :active-category="activeCategory"
            @click="onClick(category.title)"
          />
        </div>
      </div>

      <ul class="p-6 md:p-12 md:pt-0">
        <Project
          v-for="(project, i) in projects"
          :key="project._id"
          :project="project"
          :active-project="activeProject === i"
          :active-category="activeCategory"
          @mouseenter="onProjectHover(i)"
        />
      </ul>

      <div class="bg-gradient-to-b from-black to-transparent sticky w-full h-[5rem] top-0 z-10" />

      <div ref="legalSection" class="grid-layout small | p-6 pt-[15rem] pb-40 md:p-12 md:pt-[15rem]">
        <div class="col-span-full sm:col-span-5 md:col-span-11">
          <PortableText :blocks="legal.text" />
        </div>
      </div>
    </section>

    <section ref="previewSection" class="grid-layout | p-6 md:p-12 fixed inset-0 w-full h-full pointer-events-none opacity-0 items-end">
      <div class="square-fb | relative col-start-7 col-span-6 md:col-start-17 md:col-span-8 aspect-square h-full w-full">
        <a
          v-for="(project, i) in projects"
          :key="project._id"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="dark-shadow | absolute left-0 bottom-0 w-full opacity-0 hover:scale-[0.98]"
          :class="{ 'opacity-100 pointer-events-auto': activePreview === i, 'pointer-events-none': activePreview !== i }"
        >
          <figure>
            <Img :asset="project.preview.image" :alt="project.preview.alt" />
          </figure>
        </a>
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
import { select, selectAll } from '../utils/helper';
import Dot from '../components/Partials/Dot.vue';
import BtnDot from '../components/Partials/BtnDot.vue';
import { BREAKPOINTS } from '../utils/constants';

export default {
  components: { Img, CategoryBtn, Project, PortableText, Dot, BtnDot },
  async asyncData({ $sanity }) {
    return await $sanity.fetch(query);
  },
  data() {
    return {
      activeProject: undefined,
      activePreview: 0,
      activeCategory: '',
      initialProjectsPos: 0,
      showIntroDot: false,
      socials: [
        { title: 'Instagram', url: 'https://www.instagram.com/annaehrnsperger/' },
        { title: 'GitHub', url: 'https://github.com/annaehrnsperger' },
      ],
      lastScrollTop: 0,
      direction: 1,
      activeSection: 'about',
    };
  },
  head() {
    return seo(this.general);
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    this.introAnimation();
  },
  methods: {
    setProjectsPos() {
      const { projectsSection, aboutSection } = this.$refs;
      this.initialProjectsPos = aboutSection?.offsetHeight - projectsSection?.getBoundingClientRect().top;
    },
    introAnimation() {
      const { aboutSection, introText, socials, projectsSection, previewSection } = this.$refs;

      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.4 } });

      tl.to(aboutSection, { delay: 0.3, onStart: () => (this.showIntroDot = true) });
      tl.to(introText, { opacity: 1 }, '<85%');
      tl.to(aboutSection, { height: 'auto', ease: 'expo.inOut', duration: 0.8, delay: 0.5 });
      tl.to(introText, { opacity: 0, duration: 0.2 }, '<30%');
      tl.set(introText, { height: 0, onComplete: () => this.setProjectsPos() });
      tl.set([projectsSection, previewSection], { y: '120%', opacity: 1 });
      tl.to('[data-about-text]', { opacity: 1 }, '<');
      tl.to(socials, { opacity: 1 }, '<80%');
      tl.to(
        [projectsSection, previewSection],
        {
          onStart: () =>
            gsap.to([projectsSection, previewSection], {
              y: this.initialProjectsPos,
              ease: 'power4.out',
              duration: 0.8,
              onComplete: () => {
                gsap.set(projectsSection, { pointerEvents: 'auto' });

                window.addEventListener('wheel', this.onWheelUp);
              },
            }),
        },
        '<'
      );
    },
    initScrollTrigger() {
      const projects = selectAll('[data-project]');
      const fadeOuts = selectAll('[data-fade-out]');
      const categories = select('[data-categories]');

      ScrollTrigger.create({
        scroller: this.$refs.projectsSection,
        trigger: categories,
        start: 'top -2px',
        onEnter: () => {
          gsap.to(categories, {
            opacity: 0,
            duration: 0.2,
          });
        },
        onLeaveBack: () => {
          gsap.to(categories, {
            opacity: 1,
            duration: 0.2,
            onComplete: () => gsap.killTweensOf(categories),
          });
        },
      });

      fadeOuts.forEach((fadeOut) => {
        ScrollTrigger.create({
          scroller: this.$refs.projectsSection,
          trigger: fadeOut,
          start: 'top -2px',
          onEnter: () => {
            gsap.to(fadeOut, {
              opacity: 0,
              duration: 0.2,
            });
          },
          onLeaveBack: () => {
            gsap.to(fadeOut, {
              opacity: 1,
              duration: 0.2,
              onComplete: () => gsap.killTweensOf(fadeOut),
            });
          },
        });
      });

      const mm = gsap.matchMedia();
      const breakPoint = 900;

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
        },
        (context) => {
          const { isMobile } = context.conditions;

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

            return () => {
              ScrollTrigger.refresh();
              gsap.to(this.$refs.previewSection, { opacity: 1, duration: 0.1 });
            };
          }
        }
      );
    },
    onWheelUp(e) {
      if (e.deltaY > 0) this.direction = 1;
      if (e.deltaY < 0) this.direction = -1;

      const moveUpOnce = once(() => this.moveProjectsUp());

      if (this.direction === 1) moveUpOnce();
    },
    moveProjectsUp() {
      this.activeSection = 'projects';

      if (this.activeProject === 0) return;
      this.initScrollTrigger();

      const { projectsSection, previewSection } = this.$refs;

      this.activeProject = 0;

      gsap.killTweensOf([projectsSection, previewSection]);
      gsap.to([projectsSection, previewSection], {
        y: 0,
        ease: 'expo.inOut',
        duration: 0.6,
        onStart: () => {
          gsap.set(projectsSection, { overflowY: 'scroll', delay: 0.2 });
          window.removeEventListener('wheel', this.onWheelUp);
        },
      });
    },
    moveProjectsDown() {
      this.activeSection = 'about';

      if (this.activeProject === undefined) return;
      ScrollTrigger.getAll().forEach((st) => st.kill());
      this.setProjectsPos();

      const { projectsSection, previewSection } = this.$refs;

      this.activeProject = undefined;

      gsap.killTweensOf([projectsSection, previewSection]);
      gsap.to([projectsSection, previewSection], {
        y: this.initialProjectsPos,
        ease: 'power4.out',
        duration: 0.6,
        onStart: () => {
          gsap.set(projectsSection, { overflowY: 'hidden' });
          window.addEventListener('wheel', this.onWheelUp);
        },
      });
    },
    onProjectHover(i) {
      if (this.activeSection === 'about') return;

      this.activeProject = i;
      this.activePreview = i;
    },
    onScroll(e) {
      const isMobile = window.innerWidth < BREAKPOINTS.md;

      if (!isMobile) return;

      const { top } = this.$refs.legalSection.getBoundingClientRect();

      if (top - 200 < 0) {
        gsap.to(this.$refs.previewSection, { opacity: 0, duration: 0.1 });
      } else {
        gsap.to(this.$refs.previewSection, { opacity: 1, duration: 0.1 });
      }

      e.stopPropagation();
      e.preventDefault();

      const { projectsSection } = this.$refs;
      const { scrollTop } = projectsSection;

      if (scrollTop > this.lastScrollTop) this.direction = 1;
      if (scrollTop < this.lastScrollTop) this.direction = -1;

      if (this.direction === -1 && scrollTop < 5) {
        gsap.set('[data-categories]', { opacity: 1 });

        const moveDownOnce = once(() => this.moveProjectsDown());
        moveDownOnce();
      }

      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    onClick(title) {
      if (this.activeCategory === title) {
        this.activeCategory = '';
      } else {
        this.activeCategory = title;
      }
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
  transition: transform 0.3s var(--ease-out-quint);
  box-shadow: 0px 0px 40px 20px hsla(0, 0%, 0%, 0.816);
}

@supports not (aspect-ratio: 1) {
  .square-fb {
    max-height: 60vw;
  }
}
</style>
