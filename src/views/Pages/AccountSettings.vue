<template>
  <v-row>
    <v-col md="6" offset-md="3">
      <h1>
        Hello, {{ user.name }}!
      </h1>

      <validation-observer
        class="d-block"
        ref="observer"
        v-slot="{ invalid }"
      >
        <form @submit.prevent="submit">
          <validation-provider
            class="d-block"
            v-slot="{ errors }"
            name="name"
            rules="required"
          >
            <v-text-field
              v-model="user.name"
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
            <v-btn to="/">
              cancel
            </v-btn>

            <v-btn
              class="ml-4"
              type="submit"
              :disabled="invalid"
            >
              save
            </v-btn>
          </div>
        </form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>
import { email, required } from 'vee-validate/dist/rules'
import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate'
import axios from "axios";
import { mapMutations } from "vuex";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "Settings",
  created() {
    try {
      let user = JSON.parse(localStorage.getItem('user'));
      user ? this.user = user : this.user = null;
    } catch(e) {
      console.log(e)
    }
  },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    async submit() {
      try {
        const data = {
          _id: this.user._id,
          name: this.user.name,
          email: this.user.email
        };

        const resp = await axios({ url: '/api/update-user', data, method: 'POST' });



        if(resp.status === 200) {
          console.log('resp.status', resp.status)
          console.log('this._vm.$toast', this._vm.$toast)
          // this._vm.$toast.success(resp.data.message);

          console.log('this.$store', this.$store);
          console.log('asdasdadsasddassadsad.$store');

          this.$store.commit('auth/setUser', resp.data.user);
        } else {
          console.log('tyt')
        }
      } catch(error) {
        if(error.response) {
          const { message } = error.response.data;

          this._vm.$toast.error(message, {
            timeout: 1500
          });
        }
      }
    }
  },
  computed: {},
}
</script>

<style scoped>

</style>