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
                    <h5 class="headline">
                        Add food to your stock
                    </h5>
                    <add-stock-item-form></add-stock-item-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "FoodItemPage"
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
        padding: 20px;
    }
</style>