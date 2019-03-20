<template>
	<div>
		<!-- SubHeader -->
		<v-card color="#90CCF4" class="subHeader">
			<v-card-title>
				<h3 class="title">
					Your stock
				</h3>
			</v-card-title>
		</v-card>

		<v-spacer></v-spacer>

		<!-- Content -->
		<v-layout row wrap justify-center>

			<v-flex xs6 class="flexBox ma-3">
				<stock-item-list/>
			</v-flex>
			<v-flex xs5 class="flexBox ma-3">
				<add-stock-item-form></add-stock-item-form>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
    export default {
        name: "FoodItemPage",
    }
</script>

<style scoped>

	.title {
		color: white;
	}

	.subHeader {
		margin-top: -1.4%;
		margin-bottom: 1%;
	}

	.flexBox {
		margin-top: 1%;
		x: 1%;
	}

</style>