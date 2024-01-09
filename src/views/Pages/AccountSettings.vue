<template>
  <v-row>
    <v-col md="6" offset-md="3">
      <h1>Hello, {{ user.username }}!</h1>

      <h2 class="mb-4">Edit info:</h2>

      <validation-observer class="d-block" ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            class="d-block"
            v-slot="{ errors }"
            name="name"
            rules="required"
          >
            <v-text-field
              v-model="user.username"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            class="d-block"
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="user.email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>

          <div class="mt-2">
            <v-btn to="/"> cancel </v-btn>

            <v-btn class="ml-4" type="submit" :disabled="invalid"> save </v-btn>
          </div>
        </form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>
import { email, required } from 'vee-validate/dist/rules';
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import axios from 'axios';
import { API } from '@/api/consts';

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
  name: 'Settings',
  created() {
    try {
      let user = JSON.parse(localStorage.getItem('user'));
      user ? (this.user = user) : (this.user = null);

      console.log('user', user);
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async submit() {
      try {
        const data = {
          _id: this.user._id || this.user.id,
          username: this.user.username.trim(),
          email: this.user.email,
        };

        const resp = await axios({
          url: `${API}/user/update-user`,
          data,
          method: 'POST',
        });

        if (resp.status === 200) {
          this.$toast.success(resp.data.message);

          this.$store.commit('auth/setUser', resp.data.user);
        }
      } catch (error) {
        if (error.response.status === 404) {
          const message = error.response.statusText;

          this.$toast.error(message, {
            timeout: 1500,
          });
        }
      }
    },
  },
  computed: {},
};
</script>

<style scoped></style>
