<template id="stockItemList">
  <v-card class="formCard">
    <div id="list">
      <v-list two-line style="max-height: 400px" class="scroll-y">
        <v-list-tile class="top-tile">
          <v-list-tile-content>
            <v-list-tile-title>
              <h4 class="subheading top">
                <label>Name &amp; Type</label>
                <v-list-tile-action class="right">
                  <v-icon small class="delete-icon" @click="deleteItems()">delete</v-icon>
                </v-list-tile-action>
                <span class="right amount-subheader">Amount</span>
              </h4>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="stockItem in uniqueStockitems">
          <v-list-tile v-bind:key="stockItem.stockitemId" class="listTile">
            <v-list-tile-content>
              <v-list-tile-title>
                <h4 class="subheading">
                  <span class="left name">{{stockItem.food.name}}</span>
                  <span class="left type">
                    <i>&nbsp;&nbsp;{{stockItem.food.type.toLowerCase()}}</i>
                  </span>
                  <v-list-tile-action class="right">
                    <v-checkbox
                      :key="stockItem.stockitemId"
                      :value="stockItem"
                      v-model="selected"
                    ></v-checkbox>
                  </v-list-tile-action>
                  <span
                    class="right count"
                    v-if="countStockItem(stockItem)"
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
import 'es6-promise/auto';
import { RepositoryFactory } from "../../api/RepositoryFactory";
import { setTimeout } from 'timers';

const stockItemRepository = RepositoryFactory.get("stockItem");
const foodRepository = RepositoryFactory.get("food");

export default {
  name: "StockItemList",
  data() {
    return {
      selected: [],
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
        if (
          stockItem.foodId == element[0].foodId &&
          stockItem.purchaseDate == element[0].purchaseDate &&
          stockItem.expirationDate == element[0].expirationDate
        ) {
          count = element.length;
        }
      });
      return count;
    },
    async deleteItems() {
      let self = this; // Because setTimeout cant handle 'this.'
      if (confirm("Are you sure you want to delete this item?")) {
        await this.selected.forEach(element => {
            console.log(element);
        stockItemRepository.deleteAll(element.foodId);
        });
        setTimeout(function() { 
          self.$store.dispatch('RERENDER_STOCKLISTCOMPONENT'); 
          }, 1000);
      }
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

.top-tile {
  margin: -2% 0%;
}

.subheading.top {
  color: #bfbfbf;
  font-size: 2%;
}

.amount-subheader {
    margin: 0% 2% 0% 0%;
    padding: 0% 0% 0% 0%;
}

.delete-icon {
  margin: 10% 7%;
}
.type {
  opacity: 0.5;
}

.name {
  text-transform: capitalize;
}

.count {
  padding: 0% 5%;
}
</style>