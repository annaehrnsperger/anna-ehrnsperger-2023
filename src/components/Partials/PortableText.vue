<template>
  <BlockContent :blocks="blocks" />
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component';
// import CustomComponent from 'CustomComponent.vue'

export default {
  components: { BlockContent },
  props: {
    blocks: Array,
  },
  // setup() {
  //   const serializers = {
  //     types: {
  //       custom: CustomComponent,
  //     },
  //   }

  //   return { serializers }
  // },
};
</script>

<style scoped>
ul li {
  margin-left: 25px;
  display: inline-block;
}

ul li::before {
  content: '•';
  display: inline-block;
  width: 25px;
  margin-left: -25px;
}
</style>