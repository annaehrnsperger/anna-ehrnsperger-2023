<template>
  <Transition :css="false" @enter="onDotEnter" @leave="onDotLeave">
    //TODO translate-y
    <span
      v-if="show"
      class="dot-pos | absolute left-[-30px] mt-auto inline-block scale-0 w-[27px] h-[27px] rounded-full"
      :class="{ 'bg-gray': !activeCategory, 'bg-white': activeCategory, 'bg-black': isLogo }"
    />
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

<style scoped>
.dot-pos {
  transform: translateY(clamp(5px, 3vw, 7px));
}
</style>
