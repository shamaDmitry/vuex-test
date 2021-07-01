<template>
	<div class="home">
		<!--<img alt="Vue logo" src="../assets/logo.png">-->

		<h1>
			{{ counter }}
		</h1>

		<div>
			<button @click="decreaseAction">-</button>
			<button @click="increaseAction">+</button>
		</div>

		<div>
			{{ counter }} <sup>2</sup> = {{ squared }}
		</div>
	</div>
</template>

<script>
  // @ is an alias to /src
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Home',
    components: {},
		computed: {
      ...mapState('counter', {
        counter: state => state.counter,
      }),

      ...mapGetters('counter', {
        squared: 'squared'
      })
    },

    methods: {
      ...mapActions('counter', [
        'increaseAction',
        'decreaseAction'
      ])
    },
  }
</script>
