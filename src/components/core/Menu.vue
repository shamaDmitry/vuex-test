<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        class="mr-1"
        icon
        x-large
        v-on="on"
      >
        <v-avatar
          color="teal"
        >
          <v-icon dark v-if="!initials()">
            mdi-account-circle
          </v-icon>

          <span class="white--text" v-else>
            {{ initials() }}
          </span>
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar
            color="teal"
            class="mb-2"
          >
            <v-icon dark v-if="!initials()">
              mdi-account-circle
            </v-icon>

            <span class="white--text text-h5" v-else>
              {{ initials() }}
            </span>
          </v-avatar>
          <h3>{{ user.name }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn
            to="/settings"
            depressed
            rounded
            text
          >
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            @click="logOut"
          >
            Disconnect
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Menu",
  created() {
    try {
      let user = JSON.parse(localStorage.getItem('user'));
      user ? this.user = user : this.user = null;

      this.user = user;
    } catch(e) {
      console.log(e)
    }
  },
  data() {
    return {
      user: null,
    }
  },
  computed: {},
  methods: {
    ...mapMutations('auth', {
      logOut: 'logOut'
    }),

    initials() {
      let temp = this.user.name.split(' ');

      if(temp.length === 1) return false;

      let result = temp.map(item => {
        return item.slice(0, 1)
      });

      return result.join('').toUpperCase();
    }
  }
}
</script>

<style scoped>

</style>