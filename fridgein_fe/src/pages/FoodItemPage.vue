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
            <v-flex align-self-baseline>
                <stock-item-list/>
            </v-flex>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <h5 class="headline">
                            Add food to your stock
                        </h5>
                    </v-card-title>
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

</style>