<template>
	<div>
		<v-btn
			@click="getAllHistoryData"
			elevation="3"
			:loading="isLoading"
		>
			get data
		</v-btn>

		<DiffChart
			v-if="loaded"
			:chartData="chartDataRaw"
		/>
	</div>
</template>

<script>
  import DiffChart from './DiffChart'
  import { API_EXTERNAL, APP_ID } from '@/api/consts'

  export default {
    name: 'DiffChartContainer',
    components: {
      DiffChart
    },
    data() {
      return {
        loaded: false,
        isLoading: false,
        chartDataRaw: {
          labels: [],
          datasets: []
        },
      }
    },

    mounted() {
    	this.getAllHistoryData()
    },

    methods: {
      async getAllHistoryData() {
        this.loaded = false;
        this.isLoading = true;
        this.chartDataRaw.datasets = [];

        let startDate = 2001;
        let endDate = Number(new Date().getFullYear());
        let promises = [];
        let labels = [];

        for(let year = startDate; year <= endDate; year++) {
          labels.push(`${year}-01-01`);

          promises.push(
            fetch(`${API_EXTERNAL}/historical/${year}-01-01.json?app_id=${APP_ID}&symbols=UAH,EUR`)
          );
        }

        await Promise.all(promises)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(res => {
            this.chartDataRaw.labels = labels;

            let UAHdataRaw;
            let UAHdata = [];
            let EURdataRaw;
            let EURdata = [];

            res.map((oneRes) => {
              UAHdataRaw = {
                type: "line",
                borderWidth: 2,
                label: 'UAH',
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#47b784"
              };
              UAHdata.push(oneRes.rates['UAH']);

              EURdataRaw = {
                type: "line",
                borderWidth: 2,
                label: 'EUR',
                borderColor: "#033191",
                backgroundColor: "rgba(54,73,93,.5)",
              };
              EURdata.push(oneRes.rates['EUR']);
            });

            UAHdataRaw.data = UAHdata;
            EURdataRaw.data = EURdata;

            this.chartDataRaw.datasets.push(
              UAHdataRaw,
              EURdataRaw
            );

            this.loaded = true;
            this.isLoading = false;
          })
          .catch(error => console.log("Error " + error));
      }
    }
  }
</script>