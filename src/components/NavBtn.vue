<template>
  <button
    class="md:hidden pl-8 pb-16"
    :aria-expanded="String(isNavOpen)"
    aria-controls="mobile-nav"
    @click="$emit('click')"
  >
    <span class="visually-hidden">Menu</span>

    <span
      class="origin-top-left"
      :class="[{ 'rotate-45': isNavOpen }, classNames]"
      :style="{ width: width + 'px' }"
    ></span>
    <span
      :class="[{ 'opacity-0': isNavOpen }, classNames]"
      :style="{
        width: width + 'px',
        transform: `translate3d(0, ${width * space}px, 0)`,
      }"
    ></span>
    <span
      class="origin-bottom-left"
      :class="[classNames]"
      :style="{
        width: width + 'px',
        transform: `translate3d(0, ${width * space * 2}px, 0) ${
          isNavOpen ? 'rotate(-45deg)' : ''
        }`,
      }"
    ></span>
  </button>
</template>

<script>
export default {
  props: {
    isNavOpen: Boolean,
  },
  data() {
    return {
      classNames: `block h-[1px] bg-black duration-200 ease-out-quart`,
      width: 20,
      space: 0.3,
    }
  },
}
</script>
