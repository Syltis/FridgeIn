<template>
  <v-card class="formCard">
    <v-list two-line class="main-list">
      <v-list-item class="top-item">
        <v-list-item-content>
          <v-list-item-title>
            <h4 class="subtitle-1 top">
              <label>Name &amp; Type</label>
              <v-list-item-action class="float-right">
                <v-icon small class="delete-icon" @click="deleteItems()">delete</v-icon>
              </v-list-item-action>
              <span class="float-right amount-subheader">Amount</span>
            </h4>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- List -->
      <div id="list-div" class="overflow-y-auto">
        <template v-for="(stockItem, index) in uniqueStockitems">
          <v-list-item :key="index" class="listTile">
            <v-list-item-content>
              <v-list-item-title>
                <h4 class="subtitle-1">
                  <span class="float-left name">{{ stockItem.food.name }}</span>
                  <span class="float-left type">
                    <i>&nbsp;&nbsp;{{ stockItem.food.type.toLowerCase() }}</i>
                  </span>
                  <v-list-item-action class="float-right">
                    <v-checkbox
                      :key="stockItem.stockitemId + index"
                      v-model="selected[index]"
                      :value="stockItem"
                    />
                  </v-list-item-action>
                  <span class="float-right count">{{ stockItem.amount }}</span>
                </h4>
              </v-list-item-title>
              <v-list-item-action-text>
                <span class="float-left">Bought {{ stockItem.purchaseDate.substring(0,10) }} &nbsp;</span>
              </v-list-item-action-text>
              <v-list-item-action-text>
                <span
                  v-if="stockItem.expirationDate !== null"
                  class="float-right"
                >Expires {{ stockItem.expirationDate.substring(0,10) }}</span>
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index + '999'" />
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
      stock: "fridge/getStock",
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
      this.stockItemsGrouped.forEach(s => {
        if (s[0]) {
          var newObj = s[0];
          newObj.amount = s.length;
          stockItems.push(newObj);
        }
      });
      return stockItems.sort((a, b) => (a.food.name > b.food.name ? 1 : -1));
    }
  },
  methods: {
    async deleteItems() {
      var idsToDelete = [];
      if (this.selected.some(el => { return el !== null; })) {
        if (confirm("Are you sure you want to delete this item?")) {
          this.stock.forEach(s => {
            this.selected.forEach(sel => {
              if (fridgeService.stockitemCompare(s, sel)) {
                idsToDelete.push(s.stockitemId);
              }
            });
          });
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
  width: 100%;
}

#list-div {
  max-height: 600px;
}

.top-item {
  margin: -2% 0%;
}

.subtitle-1.top {
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