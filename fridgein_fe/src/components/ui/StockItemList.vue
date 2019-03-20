<template id="stockItemList">
    <v-flex class="flexBox">
        <v-card class="formCard"
        >
            <v-form>
                <v-text-field
                label="Search stock">

                </v-text-field>
            </v-form>
            <div id="list">
                <v-list
                        one-line
                        style="max-height: 400px"
                        class="scroll-y"
                >
                    <template v-for="stockitem in stockitems">
                        <v-list-tile
                                :key="stockitem.name"
                                class="listTile"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <span class="left">{{stockitem.name}}</span>
                                    <span class="right"><i
                                            class="typeI">{{stockitem.type.toLowerCase()}}&nbsp;&nbsp;</i></span>
                                </v-list-tile-title>
                                <v-list-tile-action-text>
                                    <span class="left">Bought at {{stockitem.purchaseDate}} &nbsp;</span>
                                    <span class="right" v-if="stockitem.expirationDate !== null"> Expires at {{stockitem.expirationDate}} </span>
                                </v-list-tile-action-text>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </div>
        </v-card>
    </v-flex>
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
                axios.get("http://localhost:8080/api/stockitem/readall")
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

        color: #2c3e50;

    }

    .formCard {
        padding: 30px;

    }

    .flexBox {
        margin-top: 20px;
        margin-right: 2%;
        margin-left: 2%;
        min-width: 30%;
    }

    .typeI {
        color: darkgrey;
    }

</style>