<template>
    <v-select
            :items="fooditems"
            item-text="name"
            return-object
            :menu-props="{ maxHeight: '400' }"
            label="Pick item from saved foods"
            hint="Creating a new one will save it to this list."
            persistent-hint
    ></v-select>
</template>

<script>
    import axios from "axios";

    export default {
        name: "FoodItemSelect",
        data() {
            return {
                fooditems: []
            }
        },
        mounted() {
            this.fetchFoodItems();
        },
        methods: {
            fetchFoodItems() {
                axios.get('http://localhost:8080/api/fooditem/readall')
                    .then(response => {
                        this.fooditems = response.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>