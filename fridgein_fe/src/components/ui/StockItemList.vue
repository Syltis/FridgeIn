<template id="stockItemList">
    <div id="list">
        <v-list
                one-line
                style="max-height: 400px"
                class="scroll-y"
        >
            <template v-for="stockitem in stockitems">
                <v-list-tile
                        :key="stockitem.name"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span class="left">{{stockitem.name}}</span>
                            <span class="right"><i>{{stockitem.type.toLowerCase()}}</i></span>
                        </v-list-tile-title>
                        <v-list-tile-action-text>
                            <span class="left">Bought at {{stockitem.boughtAt}} &nbsp;</span>
                            <span class="right" v-if="stockitem.expirationDate !== null"> Expires at {{stockitem.expirationDate}}</span>
                        </v-list-tile-action-text>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </template>
        </v-list>
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
        }
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