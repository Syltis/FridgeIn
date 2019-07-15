<template id="stockItemList">

    <v-card class="formCard"
    >
        <v-form>
            <v-text-field
                    label="Search stock">
            </v-text-field>
        </v-form>
        <div id="list">
            <v-list
                    two-line
                    style="max-height: 400px"
                    class="scroll-y"
            >
                <template v-for="stockItem in getUnique(stockItems, 'foodItemId')">
                    <v-list-tile
                            :key="stockItem.name"
                            class="listTile"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <h4 class="subheading">
                                    <span class="left name">{{stockItem.foodItemName}}</span>
                                    <span class="left type"><i>&nbsp;&nbsp;{{stockItem.foodItemType}}</i></span>
                                    <span class="right" v-if="isAbove(countStockItem(stockItem.foodItemId))">{{countStockItem(stockItem.foodItemId)}}</span>
                                </h4>
                            </v-list-tile-title>
                            <v-list-tile-action-text>
                                <span class="left">Bought {{stockItem.purchaseDate}} &nbsp;</span>
                            </v-list-tile-action-text>
                            <v-list-tile-action-text><span class="right" v-if="stockItem.expirationDate !== null"> Expires {{stockItem.expirationDate}} </span>
                            </v-list-tile-action-text>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </div>
    </v-card>
</template>

<script>
    import {RepositoryFactory} from "../../api/RepositoryFactory";

    const stockItemRepository = RepositoryFactory.get('stockItem');
    const foodItemRepository = RepositoryFactory.get('foodItem');

    export default {
        name: "StockItemList",
        data() {
            return {
                stockItems: [],
                foodItems: []
            }
        },
        mounted() {
            this.fetchStockItems();
            this.fetchFoodItems();
        },
        methods: {
            async fetchStockItems() {
                const {data} = await stockItemRepository.readAll();
                /*console.log(data);*/
                this.stockItems = data;
            },
            async fetchFoodItems() {
                const {data} = await foodItemRepository.readAll();
                this.foodItems = data;
            },
            isAbove(item) {
                return item > 1;
            },
            countStockItem(id) {
                const foodItem = this.foodItems.find(item => {
                    return item.foodItem_id === id;
                });
                return foodItem.stockItems.length;
            },
            getUnique(arr, comp) {
                return arr
                    .map(e => e[comp])
                    // store the keys of the unique objects
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    // eliminate the dead keys & store unique objects
                    .filter(e => arr[e]).map(e => arr[e]);
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
        min-width: 350px;
        margin-bottom: 3%;
    }

    .type {
        opacity: 0.5;
    }

    .name {
        text-transform: capitalize;
    }

</style>