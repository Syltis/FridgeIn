<template>
  <v-select
    v-if="food"
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
import { repositoryFactory } from "../../services/api/repositoryFactory";
import { mapState, mapActions } from 'vuex'
const foodRepository = repositoryFactory.get("food");

export default {
  name: "FoodSelect",
  data() {
    return {
      selectedFood: null
    };
  },
  mounted() {
    this.fetchFoods();
  },
  computed: {
    ...mapState({
      food: state => state.fridge.food,
      userId: state => state.app.userId
    })
  },
  methods: {
    async fetchFoods() {

      // Wait until state has ben set after refresh
      await new Promise(resolve => {
        setTimeout(resolve, 200);
      });
      const { data } = await foodRepository.readAllOnUser(
        this.userId
      );
      this.updateFood(data)
      // this.food.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    onSelected() {
      this.$emit("foodSelected", this.selectedFood);
    },
    ...mapActions({
      updateFood: 'fridge/updateFood'
    })
  }
};
</script>

<style scoped>
</style>