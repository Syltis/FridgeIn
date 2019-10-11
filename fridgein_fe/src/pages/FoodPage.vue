<template>
  <div>
    <!-- SubHeader -->
    <PageTitle title="Your Stock" />

    <!-- Content -->
    <v-row >
      <v-col md="6" class="flexBox">
        <StockItemList />
      </v-col>
      <v-col md="6" class="flexBox">
        <AddStockItemForm />
      </v-col>
    </v-row>
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
  padding: 1% 0% 0% 0%;
} 

.flexBox2 {
  padding: 1%;
} 

</style>