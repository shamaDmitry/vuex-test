<template>
	<v-container
		fill-height
	>
		<v-row>
			<v-col
				cols="12"
				offset-md="4"
				md="4"
				align="center"
			>
				<h1 class="mb-4">
					Login
				</h1>

				<validation-observer
					ref="observer"
					v-slot="{ invalid }"
				>
					<form @submit.prevent="submit">
						<validation-provider
							v-slot="{ errors }"
							name="email"
							rules="required|email"
						>
							<v-text-field
								v-model="email"
								:error-messages="errors"
								label="E-mail"
								required
							></v-text-field>
						</validation-provider>

						<validation-provider
							v-slot="{ errors }"
							name="password"
							rules="required"
						>
							<v-text-field
								v-model="password"
								:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required, rules.min]"
								:type="show1 ? 'text' : 'password'"
								name="input-10-1"
								label="Password"
								hint="At least 8 characters"
								counter
								@click:append="show1 = !show1"
							></v-text-field>
						</validation-provider>

						<v-btn
							class="mr-4"
							type="submit"
							:disabled="invalid"
						>
							submit
						</v-btn>
						<v-btn @click="clear">
							clear
						</v-btn>
					</form>
				</validation-observer>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  });

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  });

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  });

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  });

  extend('email', {
    ...email,
    message: 'Email must be valid',
  });

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      show1: false,
      password: 'Password',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }),

    methods: {
      submit() {
        this.$refs.observer.validate();
      },
      clear() {
        this.password = '';
        this.email = '';
        this.$refs.observer.reset();
      },
    },
  }
</script>

<style scoped>

</style>