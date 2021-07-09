<template>
	<div>
		<h1 class="mb-3">
			Official exchange rate {{ currencyText }}
		</h1>

		<v-select
			class="mb-4"
			:items="currencyCodes"
			v-model="currencyCodeName"
			v-on:change="onChangeCurrencyCode"
			dense
			hide-details
			return-object
			label="Currency"
			filled
			style="max-width: 250px;"
		></v-select>

		<v-row>
			<v-col
				cols="12"
				sm="6"
			>
				<h2 class="mb-2">
					Today price
				</h2>

				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">
								{{ today }}
							</div>
							<v-list-item-title class="headline mb-1">
								100 {{ currencyCodeName }} = {{ todayPriceDisplay }} hrn

								<template v-if="percentView !== 0">
									<v-chip
										class=""
										:color="chipColor"
										text-color="white"
									>
										<div>
											{{ percentView + ' %'}}
										</div>
										<v-icon right>
											{{ isNegative ? 'mdi-arrow-down' : 'mdi-arrow-up'}}
										</v-icon>
									</v-chip>
								</template>

								<template v-else>
									<v-chip
										text-color="white"
									>
										0
									</v-chip>
								</template>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				sm="6"
			>
				<h2 class="mb-2">
					Prev day price 1 {{ currencyCodeName }}
				</h2>

				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">
								{{ prevDate }}
							</div>

							<v-list-item-title class="headline mb-1">
								1 {{ currencyCodeName }} = {{ prevDayPrice }} hrn
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import formatDate from '@/utils/helpers'

  export default {
    name: 'Home',
    beforeMount() {
      this.onChangeCurrencyCode('USD');
      this.getCurrencyList();
    },
    computed: {
      ...mapState('currency', {
        currencyCodes: 'currencyCodes',
        prevDayPrice: 'prevDayPrice',
        currencyText: 'currencyText'
      }),

      ...mapGetters('currency', {
        todayPrice: 'todayPrice',
        prevDay: 'prevDay'
      }),

      todayPriceDisplay() {
        return +(this.todayPrice * 100).toFixed(4);
      },

      currencyCodeName: {
        get() {
          return this.$store.state.currency.currencyCodeName
        },
        set(val) {
          this.$store.commit('currency/setCurrencyCode', val)
        }
      },

      today() {
        return moment().format('LL');
      },

      prevDate() {
        return moment().subtract(1, 'days').format('LL');
      },

      percentView() {
        // ((today - prevDay) * 100%) / prevDay

        let percent = ((this.todayPrice - this.prevDayPrice) * 100) / this.prevDayPrice;

        console.log('percent', percent);

        return percent;
      },

      isNegative() {
        return Math.sign(this.percentView) === -1;
      },

      chipColor() {
        return this.isNegative ? 'red' : 'green';
      }
    },

    methods: {
      ...mapActions('currency', {
        getPrice: 'getPrice',
        getCurrencyList: 'getCurrencyList'
      }),

      onChangeCurrencyCode(code) {
        this.$store.dispatch('currency/getPrice', code)
      },
    },
  }
</script>