<template>
  <footer class="p-8">
    <p>© {{ year }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>
