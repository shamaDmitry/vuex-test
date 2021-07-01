<template>
	<div>
			<v-select
				class="mb-6"
				:items="currencyCode"
				dense
				hide-details
				label="Currency"
				filled
				style="max-width: 250px;"
			></v-select>

		<v-simple-table>
			<template v-slot:default>
				<thead>
				<tr>
					<th class="text-left">Date</th>
					<th class="text-left">Value</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="item in desserts" :key="item.id">
					<td>{{ item.name }}</td>
					<td>{{ item.calories }}</td>
				</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        currencyCode: ['USD', 'EUR'],
        desserts: [
          {
            id: 1,
            name: "2021-07-01T12:47:09.702Z",
            calories: 159,
          },
          {
            id: 2,
            name: "2021-07-01T12:47:09.702Z",
            calories: 237,
          },
          {
            id: 3,
            name: "2021-07-01T12:47:09.702Z",
            calories: 262,
          },
          {
            id: 4,
            name: "2021-07-01T12:47:09.702Z",
            calories: 305,
          },
          {
            id: 5,
            name: "2021-07-01T12:47:09.702Z",
            calories: 356,
          },
        ],
      }
    },
  }
</script>