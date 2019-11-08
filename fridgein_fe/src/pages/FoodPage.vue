<template>
  <div>
    <!-- SubHeader -->
    <PageTitle title="Your Stock" />
    
    <StockItemDataTable />

    <!-- Content 
    <v-row>
      <v-col cols="12" md="6" class="flexBox">
        <StockItemList />
      </v-col>
      <v-col cols="12" md="6" class="flexBox2">
        <AddStockItemForm />
      </v-col>
    </v-row>-->
  </div>
</template>

<script>
import "es6-promise/auto";
import StockItemList from "../components/fridge/StockItemList";
import AddStockItemForm from "../components/fridge/AddStockItemForm";
import StockItemDataTable from "../components/fridge/StockItemDataTable";

export default {
  name: "FoodPage",
  components: { AddStockItemForm, StockItemList, StockItemDataTable },
  data() {
    return {
      profile: this.$auth.profile
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    }
  }
};
</script>

<style scoped>
.subheader {
  margin-top: -0.5%;
}

#title {
  color: black;
  padding: 0% 0% 0% 0.4%;
}

.flexBox {
  padding: 0% 0% 2% 1%;
}

.flexBox2 {
  padding: 1% 1% 2% 1%;
}

@media (min-width: 1000px) {
  .flexBox {
    padding: 0% 2% 2% 1%;
  }

  .flexBox2 {
    padding: 1% 1% 2% 1%;
  }
}
</style>