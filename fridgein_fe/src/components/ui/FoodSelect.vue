<template>
  <v-select
    :items="food"
    item-text="name"
    v-model="selectedFood"
    @change="onSelected($event)"
    return-object
    clearable
    :menu-props="{ maxHeight: '400' }"
    label="Pick item from saved foods"
    hint="Creating a new one will save it to this list."
    persistent-hint
  ></v-select>
</template>

<script>
import "es6-promise/auto";
import { RepositoryFactory } from "../../api/RepositoryFactory";

const foodRepository = RepositoryFactory.get("food");

export default {
  name: "FoodSelect",
  data() {
    return {
      food: [],
      selectedFood: null
    };
  },
  mounted() {
    this.fetchFoods();
  },
  methods: {
    async fetchFoods() {

      // Wait until state has ben set after refresh
      await new Promise(resolve => {
        setTimeout(resolve, 200);
      });
      const { data } = await foodRepository.readAllOnUser(
        this.$store.getters.USER.id
      );
      this.food = data;
      this.food.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    onSelected() {
      this.$emit("foodSelected", this.selectedFood);
    }
  }
};
</script>

<style scoped>
</style>