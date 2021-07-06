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
								100 hrn = {{ todayPrice }} {{ currencyCodeName }}
							</v-list-item-title>
						</v-list-item-content>

						<v-select
							:items="currencyCodes"
							v-model="currencyCodeName"
							v-on:change="setCurrencyCode"
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
					Difference price prev day
				</h2>

				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">
								{{ prevDate }}
							</div>

							<v-list-item-title class="headline mb-1">
								28.0 hrn

								<v-chip
									class=""
									color="green"
									text-color="white"
								>
									1,0%
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

  export default {
    name: 'Home',
    mounted() {
      this.getTodayPrice(this.currencyCodeName);
    },
    computed: {
      ...mapState('currency', {
        currencyCodes: 'currencyCodes',
        currencyCodeName: 'currencyCodeName'
      }),

      ...mapGetters('currency', {
        todayPrice: 'todayPrice',
        currencyCodeName: 'currencyCodeName'
      }),

      currencyCodeName: {
        get() {
          return this.$store.state.currencyCodeName
        },
        set(val) {
          console.log('val', val);

			    this.$store.commit('currency/setCurrencyCode', val)
        }
      },

      today() {
        return moment().format('LL');
      },
      prevDate() {
        return moment().subtract(1, 'days').format('LL');
      }
    },

    methods: {
      ...mapActions('currency', [
        'getTodayPrice',
      ]),

      setCurrencyCode(e) {
        this.getTodayPrice(e);
      }
    },
  }
</script>