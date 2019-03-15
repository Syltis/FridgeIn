<template>
	<div>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card class="header">
					<no-ssr>
						<v-img :src="header"></v-img>
					</no-ssr>
				</v-card>
			</v-flex>
			<v-flex>
				<v-card>
					<v-card-title primary-title class="green">
						<h4 class="display-1">
							We want to help <strong>you</strong> keep better track of your food. Our goal
							is to reduce food waste and make life easier for our users.
						</h4>
					</v-card-title>
					<v-card-text>
						<p class="font-weight-regular">
							Our site gives you the tools you need to optimize your kitchen stores.
						</p>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>

</template>

<script>
    export default {
        name: "StartPage",
        data() {
            return {
                header: require('@/assets/images/header-fresh-produce.jpg')
            }
        },
    }
</script>

<style scoped>

	.display-1 {
		color: white;
	}

	.header {
		margin-top: -2%;
	}

	.font-weight-regular {
		font-size: x-large;
	}
</style>