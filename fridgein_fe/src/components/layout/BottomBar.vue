<template>
	<v-footer height="auto" dark>
		<v-card flat tile class="flex">
			<v-card-title class="cyan darken-1">
				<v-card-text class="text-md-center">
				Built with Spring Boot as backend API currently using a H2 in-memory database, and Vue.js as frontend
				using Axios and Vuetify.
				</v-card-text>
				<v-spacer></v-spacer>
			</v-card-title>
			<v-card-actions class="grey darken-2 justify-center">
				&copy;2018 — Fridge<strong>In</strong>
				<v-icon>home</v-icon>
			</v-card-actions>
		</v-card>
	</v-footer>
</template>

<script>
	export default {
		data: () => ({
			icons: [
				'fab fa-facebook',
				'fab fa-twitter',
				'fab fa-google-plus',
				'fab fa-linkedin',
				'fab fa-instagram'
			]
		})
	}
</script>
<style scoped>
</style>