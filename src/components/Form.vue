<template>
  <div>
    <input v-model="input" type="text" />
    <p>{{ fullname }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    }
  },
  computed: {
    fullname() {
      return this.input + ' Nachname'
    },
  },
}
</script>
