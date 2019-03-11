<template id="stockItemList">
    <div id="list">
        <ul v-if="stockitems && stockitems.length">
            <v-list three-line>
                <template v-for="stockitem in stockitems">
                    <v-list-tile
                            :key="stockitem.name"
                            avatar
                            ripple
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{stockitem.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{stockitem.type}}</v-list-tile-sub-title>
                            <v-list-tile-action-text>Bought at {{stockitem.boughtAt}}</v-list-tile-action-text>
                            <v-list-tile-action-text v-if="stockitem.expirationDate !== null">Expires at {{stockitem.expirationDate}}</v-list-tile-action-text>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "StockItemList",
        data() {
            return {stockitems: []}
        },
        mounted() {
            this.fetchStockItems();
        },
        methods: {
            fetchStockItems() {
                axios.get("http://localhost:8080/stockitems")
                    .then(response => {
                        this.stockitems = response.data
                    })
            }
        },
    }
</script>

<style scoped>
    #stockItemList {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>