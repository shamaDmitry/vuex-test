<template>
	<MainLayout />
</template>

<script>
import MainLayout from '@/views/Layout/Main-Layout'

export default {
  components: {
    MainLayout
	},
  name: 'App',
  data: () => ({
    drawer: null,
  }),
};
</script>
