<template>
	<v-app>
		<v-main>
			<EmptyHeader />

			<router-view />

			<Footer />
		</v-main>
	</v-app>
</template>

<script>
  import Footer from '@/components/core/Footer'
  import EmptyHeader from '@/components/core/EmptyHeader'

  export default {
    name: 'EmptyLayout',
    components: {
      Footer,
      EmptyHeader
    },
  }
</script>

<style scoped>

</style>