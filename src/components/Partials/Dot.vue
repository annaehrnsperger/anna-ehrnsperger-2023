<template>
  <Transition :css="false" @enter="onDotEnter" @leave="onDotLeave">
    <span v-if="show" ref="dot" class="left-[-27px] md:left-[-32px] lg:left-[-40px] xl:left-[-50px] absolute mt-auto inline-block">●</span>
  </Transition>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: {
    show: [Boolean, Number],
    activeCategory: Boolean,
    isLogo: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onDotEnter(el, done) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { scale: 0 },
        {
          scale: 1,
          ease: 'power4.inOut',
          duration: 0.2,
          delay: 0.15,
          onComplete: done,
        }
      );
    },
    onDotLeave(el, done) {
      gsap.killTweensOf(el);
      gsap.set(el, {
        scale: 0,
        onComplete: done,
      });
    },
  },
};
</script>