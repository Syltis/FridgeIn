<template>
  <v-layout row wrap>
    <v-flex xs12 md12 class="flexBox">
      <h2 class="display-1 font-weight-thin mb-3">Statistics</h2>
    </v-flex>
    <v-divider></v-divider>
    <v-flex xs12 md12 class="flexBox">
      <p>Items in stock: {{ this.stockAmount }}</p>
      <p>Saved foods: {{ this.foodAmount }}</p>
    </v-flex>
    <v-flex xs12 md12 class="flexBox" id="statistics-flex">
      <GChart type="PieChart" :data="pieChartDummyData" :options="chartOptions" id="gchart" />
    </v-flex>
  </v-layout>
</template>

<script>
import fridgeService from "../../services/fridgeService";

export default {
  name: "UserStatistics",
  data() {
    return {
      // Automatically processed with visualization.arrayToDataTable function
      pieChartDummyData: [
        ["Year", "Sales"],
        ["2014", 1000],
        ["2015", 1170],
        ["2016", 660],
        ["2017", 1030]
      ],
      chartOptions: {
        chart: {
          title: "Current Stock",
          subtitle: ""
        }
      },
      pieChartTestData: []
    };
  },
  computed: {
    stockAmount() {
      return fridgeService.getStockAmount();
    },
    foodAmount() {
      return fridgeService.getFoodAmount();
    }
  },
  methods: {
    runChartData() {
      this.pieChartTestData = fridgeService.getPieChartFridge();
    }
  },
  mounted() {
    this.runChartData();
  }
};
</script>

<style scoped>
.flexBox {
  margin: 1% 0.5%;
}

#statistics-flex {
  margin: 0% 0% 0% 0%;
  padding: 0% 15% 0% 0%;
}

#gchart {
  width: 100%;
}
</style>