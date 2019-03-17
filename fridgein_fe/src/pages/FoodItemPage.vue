<template>
    <div>
        <v-card color="#90CCF4" class="subHeader" >
            <v-card-title>
                <h3 class="title">
                    Your stock
                </h3>
            </v-card-title>
        </v-card>
        <v-spacer></v-spacer>
        <v-layout row wrap>

            <stock-item-list/>

            <add-stock-item-form></add-stock-item-form>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "FoodItemPage",
    }
</script>

<style scoped>

    .title {
        color: white;
    }

    .subHeader {
        margin-top: -25px;
    }

</style>