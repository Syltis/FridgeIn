<template>
	<v-footer height="auto" dark>
		<v-card flat tile class="flex">
			<v-card-text>
				<v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
					<v-icon size="24p">{{ icon }}</v-icon>
				</v-btn>
			</v-card-text>
			<v-card-text class="white--text pt-0">
				Built with Spring Boot as backend API currently using a H2 in-memory database, and Vue.js as frontend
				using Axios and Vuetify.
			</v-card-text>
			<v-divider></v-divider>
			<v-card-text class="white--text">
				&copy;2018 - <strong>FridgeIn</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
    export default {
        name: "BottomBar",
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