<template>
	<main-layout></main-layout>
</template>

<script>
import mainLayout from '@/views/Layout/Main-Layout'

export default {
  components: {
    mainLayout
	},
  name: 'App',
  data: () => ({
    drawer: null,
  }),
};
</script>
