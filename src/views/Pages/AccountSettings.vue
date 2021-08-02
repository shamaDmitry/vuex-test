<template>
  <div class="text-center">
    <h1>
      Settings {{ user.name }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "Settings",
  computed: {
    user(){
      return localStorage.getItem('user')
    }
  },
}
</script>

<style scoped>

</style>