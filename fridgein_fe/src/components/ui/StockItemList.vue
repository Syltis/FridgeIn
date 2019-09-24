<template id="stockItemList">
  <v-card class="formCard">
    <v-list two-line class="main-list">
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

      <!-- List -->
      <div id="list-div" class="scroll-y">
        <template v-for="(stockItem, index) in uniqueStockitems">
          <v-list-tile :key="index" class="listTile">
            <v-list-tile-content>
              <v-list-tile-title>
                <h4 class="subheading">
                  <span class="left name">{{stockItem.food.name}}</span>
                  <span class="left type">
                    <i>&nbsp;&nbsp;{{stockItem.food.type.toLowerCase()}}</i>
                  </span>
                  <v-list-tile-action class="right">
                    <v-checkbox
                      :key="stockItem.stockitemId + index"
                      :value="stockItem"
                      v-model="selected[index]"
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
          <v-divider :key="index + '999'"></v-divider>
        </template>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import "es6-promise/auto";
import { mapState } from "vuex";
import store from "../../store/index";
import restService from "../../services/api/restService";

export default {
  name: "StockItemList",
  data() {
    return {
      selected: [],
      profile: this.$auth.profile
    };
  },
  computed: {
    ...mapState({
      stockItemsUniqueGrouped: state => state.fridge.stock
    }),
    uniqueStockitems() {
      var stockItems = [];
      this.stockItemsUniqueGrouped.forEach(element => {
        if (element[0]) {
          stockItems.push(element[0]);
        }
      });
      return stockItems.sort((a, b) => (a.food.name > b.food.name ? 1 : -1));
    }
  },
  methods: {
    isAbove(item) {
      return item > 1;
    },
    countStockItem(stockItem) {
      let count = 0;
      this.stockItemsUniqueGrouped.forEach(element => {
        if (element[0]) {
          if (
            stockItem.foodId == element[0].foodId &&
            stockItem.purchaseDate == element[0].purchaseDate &&
            stockItem.expirationDate == element[0].expirationDate
          ) {
            count = element.length;
          }
        }
      });
      return count;
    },

    // Check every array in the uniqueStockitemsGrouped-array. If any item in a subarray matches, save every stockitemId in the subarray and delete them.
    // TODO: Refactor this with better use of filter, map, some
    async deleteItems() {
      var idsToDelete = [];
      if (confirm("Are you sure you want to delete this item?")) {
        this.stockItemsUniqueGrouped.forEach(stockItemArray => {
          this.selected.forEach(selectedItem => {
            if (selectedItem != null) {
              if (
                stockItemArray.some(
                  x => x.stockitemId == selectedItem.stockitemId
                )
              ) {
                let newArr = stockItemArray.map(s => s.stockitemId);
                newArr.forEach(id => {
                  idsToDelete.push(id);
                });
              }
            }
          });
        });
        restService.deleteStock(idsToDelete, store.getters["app/userId"]);
      }
    }
  }
};
</script>

 <style scoped>
.formCard {
  padding: 1%;
  margin-bottom: 0%;
}

#list-div {
  max-height: 600px;
}

.top-tile {
  margin: -2% 0%;
}

.subheading.top {
  color: #bfbfbf;
  font-size: 2%;
}

.amount-subheader {
  margin: 0% 3% 0% 0%;
  padding: 0% 0% 0% 0%;
}

.delete-icon {
  margin: 10% 5%;
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