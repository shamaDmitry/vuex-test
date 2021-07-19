<template>
	<div>
		<h1 class="mb-4">
			History exchange rate $ to {{ currenciesDisplay }}
		</h1>

		<validation-observer
			ref="observer"
			v-slot="{ invalid }"
		>
			<form @submit.prevent="submit">
				<v-row
					align="start"
					class="mb-5"
					v-for="(input, index) in currencies" :key="index"
				>
					<v-col
						cols="1"
					>
						<v-sheet
							:color="input.color"
							elevation="1"
							height="30"
							width="100%"
						></v-sheet>
					</v-col>

					<v-col
						cols="6"
						md="4"
					>
						<validation-provider
							v-slot="{ errors }"
							name="code"
							rules="required"
						>
							<v-select
								v-model="input.code"
								:items="currencyCodes"
								label="Currency"
								menu-props="auto"
								filled
								:error-messages="errors"
								required
								single-line
								dense
							></v-select>
						</validation-provider>
					</v-col>

					<v-col>
						<div class="text-center">
							<v-menu
								:close-on-content-click="false"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										color="primary"
										dark
										v-bind="attrs"
										v-on="on"
									>
										Select color
									</v-btn>
								</template>
								<v-list>
									<v-list-item>
										<v-color-picker
											v-model="input.color"
											dot-size="25"
											swatches-max-height="200"
										></v-color-picker>
									</v-list-item>
								</v-list>
							</v-menu>
						</div>
					</v-col>

					<v-col class="text-center">
						<v-btn :disabled="currencies.length === 1" @click="removeField(index)">
							<v-icon dark>
								mdi-minus
							</v-icon>
						</v-btn>

						<v-btn class="ml-2" @click="addField">
							<v-icon dark>
								mdi-plus
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</form>

			<v-btn
				@click="getAllHistoryData"
				elevation="3"
				:disabled="invalid"
				:loading="isLoading"
			>
				get data
			</v-btn>
		</validation-observer>

		<DiffChart
			v-if="chartDataRaw"
			:chartData="chartDataRaw"
		/>
	</div>
</template>

<script>
  import DiffChart from './DiffChart'
  import { API_EXTERNAL, APP_ID } from '@/api/consts'
  import { mapActions, mapState } from 'vuex'

  import { required } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager');
  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  });

  export default {
    name: 'DiffChartContainer',
    components: {
      DiffChart,
      ValidationProvider,
      ValidationObserver,
    },
    data() {
      return {
        isLoading: false,
      }
    },

    mounted() {
      this.getCurrencyList();
    },

    methods: {
      ...mapActions('currency', {
        getCurrencyList: 'getCurrencyList'
      }),

      removeField: function(index) {
        this.$store.commit('currency/removeCurrencies', index);
      },

      addField: function() {
        this.$store.commit('currency/setCurrencies',
          {
            code: '',
            color: '',
            background: 'rgba(54,73,93,.5)'
          });
      },

      getCurrencyData(entryData, currencyName) {
        return entryData.map(function(item) {
          return item.rates[currencyName]
        });
      },

      async getAllHistoryData() {
        this.isLoading = true;

        const currenciesString = this.currencies.map(item => item.code).join(',');
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

        try {
          const rawResponse = await Promise.all(promises);
          const responses = await Promise.all(rawResponse.map(res => res.json()));

          let tempDataSets = [];

          this.currencies.forEach(currency => {
            tempDataSets.push({
              type: "line",
              borderWidth: 2,
              label: currency.code,
              data: this.getCurrencyData(responses, currency.code),
              borderColor: currency.color,
              backgroundColor: currency.background
            });
          });

          this.$store.commit('currency/setDymamicChartData', {
            labels,
            datasets: tempDataSets
          });

          this.isLoading = false;
        } catch(e) {
          console.log('e', e);
        }
      }
    },
    computed: {
      ...mapState('currency', {
        currencyCodes: 'currencyCodes',
        currencies: 'currencies',
        chartDataRaw: 'chartDataRaw'
      }),

      currenciesDisplay() {
        return this.currencies.map(item => item.code).join(', ');
      }
    }
  }
</script>