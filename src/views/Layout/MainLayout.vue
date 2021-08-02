<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
      <v-list dense>
        <v-list-item link :to="menuItem.link" v-for="(menuItem, $index) in menu" :key="$index">
          <v-list-item-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ menuItem.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        App
      </v-toolbar-title>

      <v-spacer />

      <Menu />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from '@/components/core/Footer'
import Menu from '@/components/core/Menu'

export default {
  components: {
    AppFooter,
    Menu
  },
  name: 'Main-Layout',
  data: () => ({
    drawer: null,
    menu: [
      {
        title: 'Home',
        link: '/',
        icon: 'mdi-view-dashboard'
      },
      {
        title: 'History',
        link: '/history',
        icon: 'mdi-cog'
      },
      {
        title: 'Dynamic History',
        link: '/dynamic-history',
        icon: 'mdi-cog-sync'
      },
    ],
  }),
};
</script>