<template>
	<v-row>
		<v-col>
			<DiffChartContainer />
		</v-col>
	</v-row>
</template>

<script>
  import DiffChartContainer from '@/components/DiffChart/DiffChartContainer'

  export default {
		name: "DynamicHistory",
		components: {
      DiffChartContainer
		}
  }
</script>