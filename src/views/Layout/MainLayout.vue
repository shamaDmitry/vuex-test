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

			<v-spacer />

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
							<!--<v-icon dark>-->
							<!--mdi-account-circle-->
							<!--</v-icon>-->

							<span class="white--text">
								{{ user.initials }}
							</span>
						</v-avatar>
					</v-btn>
				</template>

				<v-card>
					<v-list-item-content class="justify-center">
						<div class="mx-auto text-center">
							<v-avatar
								color="teal"
							>
								<span class="white--text text-h5">{{ user.initials }}</span>
							</v-avatar>
							<h3>{{ user.fullName }}</h3>
							<p class="text-caption mt-1">
								{{ user.email }}
							</p>
							<v-divider class="my-3"></v-divider>
							<v-btn
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
  import { mapMutations } from 'vuex'

  export default {
    components: {
      AppFooter
    },
    name: 'Main-Layout',
    data: () => ({
      drawer: null,
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }),
		methods: {
			...mapMutations('auth', {
			  logOut: 'logOut'
			})
		}
  };
</script>
