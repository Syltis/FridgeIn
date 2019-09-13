<template>
  <div>
    <!-- SubHeader -->
    <v-card color="#90CCF4" class="subheader">
      <v-card-title>
        <h3 class="title">Your stock</h3>
      </v-card-title>
    </v-card>

    <!-- Content -->
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 class="flexBox">
        <StockItemList :key="stockComponentKey"></StockItemList>
      </v-flex>
      <v-flex xs12 md5 class="flexBox">
        <AddStockItemForm></AddStockItemForm>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import 'es6-promise/auto';
import StockItemList from "../components/ui/StockItemList";
import AddStockItemForm from "../components/ui/AddStockItemForm";

export default {
  name: "FoodPage",
	components: { AddStockItemForm, StockItemList },
	computed: {
		stockComponentKey() {
			return this.$store.getters.STOCKCOMPONENTKEY;
		}
	},
	watch: {
		componentKey() {
			console.log("Watch set");
		}
	}
};
</script>

<style scoped>
.subheader {
	margin-top: -0.5%;
}
.title {
  color: white;
}

.flexBox {
  margin: 2% 0.5% 5% 0.5%;
}
</style>