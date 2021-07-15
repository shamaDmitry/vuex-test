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
    	// this.getAllHistoryData()
    },

    methods: {
      async getAllHistoryData() {
        this.loaded = false;
        this.isLoading = true;
        this.chartDataRaw.datasets = [];
        const currencies = ['UAH', 'EUR'];
        const currenciesString = currencies.join(',');

        let startDate = 2001;
        let endDate = Number(new Date().getFullYear());
        let promises = [];
        let labels = [];

        for(let year = startDate; year <= endDate; year++) {
          labels.push(`${year}-01-01`);

          promises.push(
            fetch(`${API_EXTERNAL}/historical/${year}-01-01.json?app_id=${APP_ID}&symbols=${currenciesString}`)
          );
        }

        this.chartDataRaw.labels = labels;

        const rawResponse = await Promise.all(promises);
        const responses = await Promise.all(rawResponse.map(r => r.json()));
				console.log('responses', responses);

				// for

        UAHdataRaw = {
          type: "line",
          borderWidth: 2,
          label: 'UAH',
          data: UAHdata,
          borderColor: "#47b784",
          backgroundColor: "rgba(54,73,93,.5)"
        };

        EURdataRaw = {
          type: "line",
          borderWidth: 2,
          label: 'EUR',
          data: EURdata,
          borderColor: "#033191",
          backgroundColor: "rgba(54,73,93,.5)"
        };

        this.chartDataRaw.datasets.push(
          UAHdataRaw,
          EURdataRaw
        );


        await Promise.all(promises)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(res => {


            let UAHdataRaw;
            let UAHdata = [];
            let EURdataRaw;
            let EURdata = [];

            res.map((oneRes) => {
							UAHdata.push(oneRes.rates['UAH']);
              EURdata.push(oneRes.rates['EUR']);
            });

						let baseConfig = {
              type: "line",
              borderWidth: 2,
						};

            UAHdataRaw = {
							...baseConfig,
							label: 'UAH',
              data: UAHdata,
              borderColor: "#47b784",
              backgroundColor: "rgba(54,73,93,.5)"
            };

            EURdataRaw = {
							...baseConfig,
							label: 'EUR',
							data: EURdata,
              borderColor: "#033191",
              backgroundColor: "rgba(54,73,93,.5)"
						};

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