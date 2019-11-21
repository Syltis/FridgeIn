<template>
  <v-select
    v-if="food"
    v-model="selectedFood"
    :items="food"
    item-text="name"
    return-object
    clearable
    :menu-props="{ maxHeight: '400' }"
    label="Pick item from saved foods"
    hint="Creating a new one will save it to this list."
    persistent-hint
    @change="onSelected($event)"
  />
</template>

<script>
import "es6-promise/auto";
import { mapGetters } from 'vuex';

export default {
  name: "FoodSelect",
  data() {
    return {
      selectedFood: null
    };
  },
  computed: {
    ...mapGetters({
      food: 'fridge/getFood',
      userId: 'app/getUserId'
    })
  },
  methods: {
    onSelected() {
      this.$emit("foodSelected", this.selectedFood);
    }
  }
};
</script>

<style scoped>
</style>