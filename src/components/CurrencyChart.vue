<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
		data() {
      return {
        chartdata: {
          labels: ['2021-07-01', '2021-07-01', '2021-07-01','2021-07-01','2021-07-01', '2021-07-01','2021-07-01'],
          datasets: [
            {
              label: 'USD',
              borderColor: '#ff6384',
              data: [3, 5, 4, 9, 12, 22, 3]
            },
            {
              label: 'EUR',
              borderColor: '#36a2eb',
              data: [2, 4, 5, 4, 6, 8, 9]
            }
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
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
	}
</script>