<template>
  <div>
    <!-- SubHeader -->
    <h1 id="title" class="display-2 font-weight-thin mb-3">Your stock</h1>

    <!-- Content -->
    <v-layout row wrap justify-center>
      <v-flex xs12 md6 class="flexBox">
        <StockItemList></StockItemList>
      </v-flex>
      <v-flex xs12 md5 class="flexBox">
        <AddStockItemForm></AddStockItemForm>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import "es6-promise/auto";
import StockItemList from "../components/ui/StockItemList";
import AddStockItemForm from "../components/ui/AddStockItemForm";

export default {
  name: "FoodPage",
  components: { AddStockItemForm, StockItemList },
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
  margin: 1% 0.5% 5% 0.5%;
}
</style>