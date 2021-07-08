<template>
	<div>
		<h1 class="mb-3">
			Official exchange rate
		</h1>

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
								<div>
									1 {{ currencyCodeName }} = {{ todayPrice }} hrn
								</div>
								<div>
									100 {{ currencyCodeName }} = {{ todayPriceDisplay }} hrn
								</div>
							</v-list-item-title>
						</v-list-item-content>

						<v-select
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
					</v-list-item>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				sm="6"
			>
				<h2 class="mb-2">
					Difference price prev day 1 {{ currencyCodeName }}
				</h2>

				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">
								{{ prevDate }}
							</div>

							<v-list-item-title class="headline mb-1">
								1 {{ currencyCodeName }} = {{ prevDayPrice }} hrn

								<v-chip
									class=""
									color="green"
									text-color="white"
								>
									<div>
										{{ percentView }} %
									</div>
									<v-icon right>mdi-arrow-up</v-icon>
								</v-chip>
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
    created() {
			this.onChangeCurrencyCode('USD')
    },
    computed: {
      ...mapState('currency', {
        currencyCodes: 'currencyCodes',
        prevDayPrice: 'prevDayPrice'
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
        return ((this.prevDayPrice - this.todayPrice) / this.todayPrice * 100).toFixed(4);
			}
    },

    methods: {
			...mapActions('currency', {
        getPrice: 'getPrice'
			}),

      onChangeCurrencyCode(code) {
        this.$store.dispatch('currency/getPrice', code)
      },
    },
  }
</script>