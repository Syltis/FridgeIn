<template>
  <v-layout row wrap>
    <v-flex xs12 md12 class="flexBox">
      <h2 class="display-1 font-weight-thin">Statistics</h2>
    </v-flex>
    <v-divider></v-divider>
    <v-flex xs12 md12 class="flexBox">
      <p>Items in stock: {{ this.stockAmount }}</p>
      <p>Saved foods: {{ this.foodAmount }}</p>
    </v-flex>
    <v-flex xs12 md12 class="flexBox" id="statistics-flex">
      <v-card class="chart-card" :elevation="3"  >
        <h2 class="title font-weight-regular mb-3">Store by Food-type</h2>
        <v-divider></v-divider>
      <GChart
        type="PieChart"
        :data="this.getPieChartArray"
        :resizeDebounce="500"
        :options="chartOptions"
        id="gchart"
      />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import fridgeService from "../../services/fridgeService";

export default {
  name: "UserStatistics",
  data() {
    return {
      chartOptions: {
        chart: {
          title: "Current Stock",
          subtitle: ""
        }
      },
      arr: []
    };
  },
  computed: {
    stockAmount() {
      return fridgeService.getStockAmount();
    },
    foodAmount() {
      return fridgeService.getFoodAmount();
    },
    // Automatically processed with visualization.arrayToDataTable function
    getPieChartArray() {
      return fridgeService.getPieChartStock();
    }
  }
};
</script>

<style scoped>
.flexBox {
  margin: 1% 0.5%;
  padding: 0.5%;
}

#statistics-flex {
  margin: 0% 0% 0% 0%;
  padding: 0% 15% 0% 0%;
}

.chart-card {
  padding: 2%;
  width: 70%;
}

@media (max-width:  1000px) {
  .chart-card {
    padding: 2%;
    width: 100%;
  }

  #statistics-flex {
  
  padding: 0% 0% 0% 0%;
}
}

#gchart {
  width: 100%;
  padding-left: -10%;
}
</style>