<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" offset-md="4" md="4" align="center">
        <h1 class="mb-4">Login</h1>

        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submitLogin">
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
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </validation-provider>

            <v-btn @click="clearFields"> clear </v-btn>

            <v-btn class="ml-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';
import { mapMutations } from 'vuex';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
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
  }),

  computed: {
    email: {
      get() {
        return this.$store.state.auth.user.email;
      },
      set(email) {
        this.$store.commit('auth/setEmail', email);
      },
    },
    password: {
      get() {
        return this.$store.state.auth.user.password;
      },
      set(password) {
        this.$store.commit('auth/setPassword', password);
      },
    },
  },

  methods: {
    ...mapMutations('auth', {
      clearFields: 'clearFields',
    }),

    submitLogin() {
      let data = {
        email: this.email,
        password: this.password,
      };

      try {
        this.$store
          .dispatch('auth/login', data)
          .then(() => this.$router.push('/'));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
