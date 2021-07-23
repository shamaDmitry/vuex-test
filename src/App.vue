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
    created() {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('auth/logout')
          }
          throw err;
        });
      });
    },
    computed: {
      ...mapGetters('auth', {
        isLoggedIn: 'isLoggedIn'
      })
    }
  };
</script>
