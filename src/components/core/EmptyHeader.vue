<template>
	<v-row>
		<v-col class="text-right">
			<v-btn
				v-for="link in links"
				:key="link"
				:to="link"
				color="white"
				text
				class="my-2 mx-2"
			>
				{{ link }}
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
  export default {
    name: "EmptyHeader",
    data: () => ({
      links: [
        'login',
        'register'
      ],
    }),
  }
</script>

<style scoped>

</style>