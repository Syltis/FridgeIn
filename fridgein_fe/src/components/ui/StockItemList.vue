<template id="stockItemList">
  <v-card class="formCard">
    <v-form>
      <v-text-field label="Search stock"></v-text-field>
    </v-form>
    <div id="list">
      <v-list two-line style="max-height: 400px" class="scroll-y">
        <template v-for="stockItem in uniqueStockitems">
          <v-list-tile v-bind:key="stockItem.stockitemId" class="listTile">
            <v-list-tile-content>
              <v-list-tile-title>
                <h4 class="subheading">
                  <span class="left name">{{stockItem.food.name}}</span>
                  <span class="left type">
                    <i>&nbsp;&nbsp;{{stockItem.food.type.toLowerCase()}}</i>
                  </span>
                  <span
                    class="right"
                    v-if="isAbove(countStockItem(stockItem))"
                  >{{countStockItem(stockItem)}}</span>
                </h4>
              </v-list-tile-title>
              <v-list-tile-action-text>
                <span class="left">Bought {{stockItem.purchaseDate.substring(0,10)}} &nbsp;</span>
              </v-list-tile-action-text>
              <v-list-tile-action-text>
                <span
                  class="right"
                  v-if="stockItem.expirationDate !== null"
                >Expires {{stockItem.expirationDate.substring(0,10)}}</span>
              </v-list-tile-action-text>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="stockItem.food.foodId + stockItem.stockitemId"></v-divider>
        </template>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import { RepositoryFactory } from "../../api/RepositoryFactory";

const stockItemRepository = RepositoryFactory.get("stockItem");
const foodRepository = RepositoryFactory.get("food");

export default {
  name: "StockItemList",
  data() {
    return {
      uniqueStockitemsGrouped: [],
      uniqueStockitems: [],
      food: []
    };
  },
  mounted() {
    this.fetchUniqueStockitemsGrouped();
    this.fetchFoods();
  },
  methods: {
    async fetchUniqueStockitemsGrouped() {
      const { data } = await stockItemRepository.readUnique();
      this.uniqueStockitemsGrouped = data;
      this.listUniqueStockitems();
    },
    async fetchFoods() {
      const { data } = await foodRepository.readAll();
      this.food = data;
    },
    listUniqueStockitems() {
        this.uniqueStockitemsGrouped.forEach(element => {
            this.uniqueStockitems.push(element[0]);
        });
    },
    isAbove(item) {
      return item > 1;
    },
    countStockItem(stockItem) {
        let count = 0;
        this.uniqueStockitemsGrouped.forEach(element => {
            if (stockItem.foodId == element[0].foodId 
            && stockItem.purchaseDate == element[0].purchaseDate 
            && stockItem.expirationDate == element[0].expirationDate) {
                count = element.length;
            }
      })
      return count;
    }
  }
};
</script>

 <style scoped>
#stockItemList {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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