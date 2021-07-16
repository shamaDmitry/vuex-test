<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			app
			clipped
		>
			<v-list dense>
				<v-list-item link to="/">
					<v-list-item-action>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>
							Home
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link to="/history">
					<v-list-item-action>
						<v-icon>mdi-cog</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>
							History
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item link to="/dynamic-history">
					<v-list-item-action>
						<v-icon>mdi-cog-sync</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>
							Dynamic History
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

  export default {
    components: {
      AppFooter
    },
    name: 'Main-Layout',
    data: () => ({
      drawer: null,
    }),
  };
</script>
