<template>
  <article>
    <section class="p-6 pt-5 md:p-12 md:pt-9">
      <NuxtLink to="/" class="group">
        <span class="inline-block group-hover:scale-75 duration-150">●</span>
        <span>Back Home</span>
      </NuxtLink>
    </section>

    <section class="black-section | fixed bottom-0 flex flex-col h-screen w-full items-center justify-center bg-black text-white">
      <NuxtLink to="/" class="flex flex-col items-center">
        <p class="text-[20rem] pb-8">{{ randomEmoji }}</p>
        <h1>Page Not Found</h1>
      </NuxtLink>
    </section>
  </article>
</template>

<script>
import { gsap } from 'gsap';

export default {
  data() {
    return {
      emojis: ['🫠', '🤔', '🤡', '🧐', '🥸', '😶‍🌫️', '💩', '🥲', '🕳️', '❤️‍🩹'],
    };
  },
  computed: {
    randomEmoji() {
      return gsap.utils.random(this.emojis);
    },
  },
};
</script>

<style scoped>
.black-section {
  height: calc(100vh - var(--projects-top));
  box-shadow: 0px 10px 30px 10px hsl(0, 0%, 25%);
}
</style>
