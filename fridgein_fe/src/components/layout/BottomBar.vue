<template>
	<v-footer height="auto" dark>
		<v-card class="flex">
			<v-card-title class="green justify-center" align="center">
				Make sure to check us out on social media
			</v-card-title>
			<v-card-actions class="grey darken-2 justify-center">
				&copy;2018 — Fridge<strong>In</strong>
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