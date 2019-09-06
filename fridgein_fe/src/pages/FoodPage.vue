<template>
  <div>
    <!-- SubHeader -->
    <v-card color="#90CCF4" class="subHeader">
      <v-card-title>
        <h3 class="title">Your stock</h3>
      </v-card-title>
    </v-card>

    <v-spacer></v-spacer>

    <!-- Content -->
    <v-layout row wrap justify-center>
      <v-flex xs5 class="flexBox ma-3">
        <StockItemList></StockItemList>
      </v-flex>
      <v-flex xs6 class="flexBox ma-3">
        <AddStockItemForm></AddStockItemForm>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import StockItemList from "../components/ui/StockItemList";
import AddStockItemForm from "../components/ui/AddStockItemForm";

export default {
  name: "FoodPage",
  components: { AddStockItemForm, StockItemList }
};
</script>

<style scoped>
.title {
  color: white;
}

.subHeader {
  margin-top: -2%;
  margin-bottom: 1%;
}

.flexBox {
  margin-top: 1%;
}
</style>