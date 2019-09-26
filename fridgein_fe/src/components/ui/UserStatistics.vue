<template>
  <v-card xs12 md6 class="profile-card">
    <v-layout row wrap>
      <v-flex xs12 md12 class="flexBox">
        <h2 class="display-1 font-weight-thin mb-3">Statistics</h2>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs12 md12 class="flexBox">  
        <p>Items in stock: {{ this.stockAmount }}</p>
        <p>Saved foods: {{ this.foodAmount }}</p>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import fridgeService from "../../services/fridgeService";

export default {
  name: "UserStatistics",
  computed: {
    stockAmount() {
      return fridgeService.getStockAmount();
    },
    foodAmount() {
      return fridgeService.getFoodAmount();
    }
  }
};
</script>

<style scoped>
.profile-card {
  margin: 1% 0.5%;
  padding: 1%;
  width: 40%;
}

.flexBox {
  margin: 1% 0.5%;
}
</style>