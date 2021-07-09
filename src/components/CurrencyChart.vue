<script>
  import { Line } from 'vue-chartjs'
  import { mapState } from 'vuex'

  export default {
    name: 'chart',
    extends: Line,
    data() {
      return {
        chartdata: {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'USD',
              borderColor: '#ff6384',
              data: [3, 5, 4, 9, 12, 22, 3]
            },
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          maintainAspectRatio: false,
        }
      }
    },
		computed: {
      ...mapState('currency', {
        historyData: 'historyData'
			}),

			chartLabels() {
        return this.historyData.map(data => data.rate)
			},

			chartValues() {
        return this.historyData.map(data => data.exchangedate)
      }
		},
    mounted() {
      this.renderChart({
        labels: this.chartLabels,
        datasets: this.chartValues
			}, this.options)
    }
  }
</script>