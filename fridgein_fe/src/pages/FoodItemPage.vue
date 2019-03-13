<template>
    <div>
        <v-card color="green">
            <v-card-title>
                <h3 class="title">
                    Your stock
                </h3>
            </v-card-title>
        </v-card>
        <v-spacer></v-spacer>
        <v-layout>
            <v-flex class="flexBox">
                <v-card class="formCard">
                    <stock-item-list/>
                </v-card>
            </v-flex>
            <v-flex class="flexBox">
                <v-card class="formCard">
                    <v-layout row wrap>
                        <h5 class="headline">
                            Add food to your stock
                        </h5>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="fooditem"
                                    :items="fooditems"
                                    item-text="name"
                                    :menu-props="{ maxHeight: '400' }"
                                    label="Pick an item from your saved foods"
                                    hint="Creating a new one will save it to this list."
                                    multiple
                                    persistent-hint
                            ></v-select>
                        </v-flex>

                    </v-layout>
                    <add-stock-item-form></add-stock-item-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {

        name: "FoodItemPage",
        data() {
            return {
                e6: [],
                fooditems: []
            }
        },
        mounted() {
            this.fetchFoodItems();
        },
        methods: {
            fetchFoodItems() {
                axios.get('http://localhost:8080/fooditems')
                    .then(response => {
                        this.fooditems = response.data
                    })
            }
        }
    }
</script>

<style scoped>

    .title {
        color: white;
    }

    .flexBox {
        margin: 30px;
    }

    .formCard {
        padding: 30px;
    }
</style>