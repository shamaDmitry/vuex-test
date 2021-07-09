<template>
	<div>
		<h1 class="mb-3">
			History exchange rate

			<small class="d-block">
				1 {{ currencyText }}
			</small>
		</h1>

		<v-row>
			<v-col>
				<history-table />
			</v-col>

			<v-col>
				<div>
					<currency-chart />
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable'
  import CurrencyChart from '@/components/CurrencyChart'

  import { mapState } from 'vuex'

  export default {
    components: {
      HistoryTable,
      CurrencyChart
    },
    computed: {
      ...mapState('currency', {
        currencyText: 'currencyText'
      })
    }
  }
</script>