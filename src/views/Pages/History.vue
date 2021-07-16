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
				<HistoryTable />
			</v-col>

			<v-col>
				<div>
					<CurrencyChart
						:chartData="chartDataRaw"
						:options="chartOptions" />
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable'
  import CurrencyChart from '@/components/CurrencyChart'

  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      HistoryTable,
      CurrencyChart,
    },

    computed: {
      ...mapState('currency', {
        currencyText: 'currencyText',
        currencyCodeName: 'currencyCodeName',
      }),

      ...mapGetters('currency', {
        chartLabels: 'chartLabels',
        chartValues: 'chartValues'
      }),

      chartOptions() {
        return {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          maintainAspectRatio: false,
        }
      },

      chartDataRaw() {
        return {
          labels: this.chartLabels,
          datasets: [this.chartValues]
        }
      }
    }
  }
</script>