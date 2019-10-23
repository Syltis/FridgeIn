<template>
  <v-row>
    <v-col
      md="12"
      class="colBox xs"
    >
      <h1 class="display-2 font-weight-thin">
        Statistics
      </h1>
    </v-col>
    <v-divider />
    <v-col 
      md="12" 
      class="colBox"
    >
      <p>Items in stock: {{ stockAmount }}</p>
      <p>Saved foods: {{ foodAmount }}</p>
    </v-col>
    <v-col
      id="statistics-col"
      md="12"
      class="colBox xs"
    >
      <v-card
        class="chart-card"
        :elevation="3"
      >
        <h2 class="headline font-weight-regular mb-3">
          Store by Food-type
        </h2>
        <v-divider />
        <GChart
          id="gchart"
          type="PieChart"
          :data="getPieChartArray"
          :resize-debounce="500"
          :options="chartOptions"
        />
      </v-card>
    </v-col>
  </v-row>
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
.colBox {
  margin: 1% 0.5%;
  padding: 0.5%;
}

#statistics-col {
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

  #statistics-col {
  
  padding: 0% 0% 0% 0%;
}
}

#gchart {
  width: 100%;
  padding-left: -10%;
}
</style>