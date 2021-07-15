<template>
	<v-app>
		<v-main>
			<router-view />

			<Footer />
		</v-main>
	</v-app>
</template>

<script>
  import Footer from '@/components/core/Footer'

  export default {
    name: 'EmptyLayout',
    components: {
      Footer
    }
  }
</script>

<style scoped>

</style>