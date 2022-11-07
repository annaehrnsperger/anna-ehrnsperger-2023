<template>
  <span
    class="
      h-[8px]
      w-[8px]
      xl:h-[12px] xl:w-[12px]
      inline-block
      rounded-full
      translate-y-[0.5px]
      lg:-translate-y-[1px]
      border
      xl:border-[1.5px]
      border-solid
      duration-150
    "
    :class="{
      'bg-white md:bg-gray': isActive,
      'border-white md:border-gray bg-transparent md:group-hover:bg-gray': !isActive,
      'border-black md:border-black bg-black md:group-hover:bg-transparent': isSocial,
    }"
  />
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    isSocial: {
      type: Boolean,
      default: false,
    },
  },
};
</script>