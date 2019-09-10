<template>
  <v-select
    :items="food"
    item-text="name"
    v-model="selectedFood"
    @change = onSelected($event)
    return-object
    clearable
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
      food: [],
      selectedFood: null
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
    onSelected() {
      this.$emit('foodSelected', this.selectedFood);
    }
  }
};
</script>

<style scoped>
</style>