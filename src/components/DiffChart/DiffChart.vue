<script>
  import { Line, mixins } from 'vue-chartjs'

  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
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
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>