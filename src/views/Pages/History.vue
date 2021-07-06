<template>
	<div>
		<h1 class="mb-3">History exchange rate</h1>

		<HistoryTable></HistoryTable>
	</div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable'

  export default {
    components: {
      HistoryTable
    }
  }
</script>