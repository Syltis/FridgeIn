<template>
  <v-select
    :items="food"
    item-text="name"
    return-object
    :menu-props="{ maxHeight: '400' }"
    label="Pick item from saved foods"
    hint="Creating a new one will save it to this list."
    persistent-hint
  ></v-select>
</template>

<script>
import { RepositoryFactory } from "../../api/RepositoryFactory";

const foodRepository = RepositoryFactory.get("food");

export default {
  name: "FoodSelect",
  data() {
    return {
      food: []
    };
  },
  mounted() {
    this.fetchFoods();
  },
  methods: {
    async fetchFoods() {
      const { data } = await foodRepository.readAll();
      this.food = data;
    },
    // Try to add the 'topping' to the name in the v-elect item-text
    name: item => item.name + " " + item.type
  }
};
</script>

<style scoped>
</style>