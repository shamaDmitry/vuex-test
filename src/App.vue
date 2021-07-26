<template>
	<MainLayout v-if="isLoggedIn" />
	<EmptyLayout v-else />
</template>

<script>
  import MainLayout from '@/views/Layout/MainLayout'
  import EmptyLayout from '@/views/Layout/EmptyLayout'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      MainLayout,
      EmptyLayout
    },
    name: 'App',
    computed: {
      ...mapGetters('auth', {
        isLoggedIn: 'isLoggedIn'
      })
    }
  };
</script>
