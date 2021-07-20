<template>
	<!--<MainLayout />-->
	<EmptyLayout />
</template>

<script>
  import MainLayout from '@/views/Layout/MainLayout'
  import EmptyLayout from '@/views/Layout/EmptyLayout'

  export default {
    components: {
      MainLayout,
      EmptyLayout
    },
    name: 'App',
    data: () => ({
      drawer: null,
    }),
  };
</script>
