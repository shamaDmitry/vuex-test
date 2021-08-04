<template>
	<div>
		<v-autocomplete
			class="mb-6"
			:items="currencyCodes"
			v-model="currencyCodeName"
			v-on:change="onChangeCurrencyCode"
			dense
			hide-details
			label="Currency"
			menu-props="auto"
			filled
			style="max-width: 250px;"
		></v-autocomplete>

		<v-simple-table>
			<template v-slot:default>
				<thead>
				<tr>
					<th class="text-left">Date</th>
					<th class="text-left">Value</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(item, index) in historyData" :key="index">
					<td>{{ item.exchangedate }}</td>
					<td>{{ item.rate }} hrn</td>
				</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    mounted() {
      this.getCurrencyList();
      this.onChangeCurrencyCode(this.currencyCodeName);
    },
    computed: {
      ...mapState('currency', {
        currencyCodes: 'currencyCodes',
        historyData: 'historyData'
      }),

      currencyCodeName: {
        get() {
          return this.$store.state.currency.currencyCodeName
        },
        set(val) {
          this.$store.commit('currency/setCurrencyCode', val)
        }
      },

    },
    methods: {
      ...mapActions('currency', {
        getCurrencyList: 'getCurrencyList'
      }),

      onChangeCurrencyCode(code) {
        this.$store.dispatch('currency/getHistoryData', code)
			}
    }
  }
</script>