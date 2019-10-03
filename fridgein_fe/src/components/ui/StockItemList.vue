<template>
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
                  <span class="right count">{{ stockItem.amount }}</span>
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
import { mapGetters } from "vuex";
import fridgeService from "../../services/fridgeService";

export default {
  name: "StockItemList",
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapGetters({
      stock: "fridge/getNewStock",
      userId: "app/getUserId"
    }),
    stockItemsGrouped() {
      return fridgeService.getFormattedStock(
        this.stock,
        fridgeService.stockitemCompare
      );
    },
    uniqueStockitems() {
      var stockItems = [];
      console.log("stockItemsGrouped");
      console.table(this.stockItemsGrouped);
      this.stockItemsGrouped.forEach(s => {
        if (s[0]) {
          var newObj = s[0];
          newObj.amount = s.length;
          stockItems.push(newObj);
        }
      });
      console.log(stockItems);
      return stockItems.sort((a, b) => (a.food.name > b.food.name ? 1 : -1));
    }
  },
  methods: {
    async deleteItems() {
      var idsToDelete = [];
      if (this.selected.some(el => { return el !== null;})) {
        if (confirm("Are you sure you want to delete this item?")) {
            this.stock.forEach(s => {
              this.selected.forEach(sel => {
                if (fridgeService.stockitemCompare(s, sel)) {
                  idsToDelete.push(s.stockitemId);
                }
              })
            })
          console.log(idsToDelete);
          fridgeService.deleteStock(idsToDelete, this.userId);
        }
      }
    }
  }
};
</script>

 <style scoped>
.formCard {
  padding: 2%;
  width: 98%;
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