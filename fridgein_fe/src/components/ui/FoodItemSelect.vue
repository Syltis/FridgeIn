<template>
    <v-select
            :items="foodItems"
            item-text="name"
            return-object
            :menu-props="{ maxHeight: '400' }"
            label="Pick item from saved foods"
            hint="Creating a new one will save it to this list."
            persistent-hint
    ></v-select>
</template>

<script>
    import {RepositoryFactory} from "../../api/RepositoryFactory";

    const foodItemRepository = RepositoryFactory.get('foodItem');

    export default {
        name: "FoodItemSelect",
        data() {
            return {
                foodItems: []
            }
        },
        mounted() {
            this.fetchFoodItems();
        },
        methods: {
            async fetchFoodItems() {
                const { data } = await foodItemRepository.readAll();
                this.foodItems = data;
            }
        }
    }
</script>

<style scoped>

</style>