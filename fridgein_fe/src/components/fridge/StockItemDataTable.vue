<template>
  <div>
    <v-data-table :dense="$vuetify.breakpoint.xs" :mobile-breakpoint="530" :headers="headers" :items="uniqueStockitems">
      <template v-slot:item.food.name="{ item }">{{ item.food.name | capitalize }}</template>
      <template v-slot:item.purchaseDate="{ item }">{{ item.purchaseDate | onlyDate }}</template>
      <template v-slot:item.expirationDate="{ item }">{{ item.expirationDate | onlyDate }}</template>
      <template v-slot:top>
        <v-toolbar flat color="#fafafa">
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on }">
              <v-btn color="green" dark class="mb-2" v-on="on">Add to Stock</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add to Stock</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fridgeService from "../../services/fridgeService";

export default {
  name: "StockItemDataTable",
  filters: {
    onlyDate: function(datetime) {
      return datetime != null ? datetime.substring(0, 10) : "";
    },
    capitalize: function(string) {
      return string != null ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    }
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      type: "",
      purchaseDate: null,
      expirationDate: null
    },
    defaultItem: {
      name: "",
      type: "",
      purchaseDate: null,
      expirationDate: null
    },
    headers: [
      {
        text: "Name",
        value: "food.name"
      },
      {
        text: "Type",
        value: "food.type"
      },
      {
        text: "Purchase Date",
        value: "purchaseDate"
      },
      {
        text: "Expiration Date",
        value: "expirationDate"
      },
      {
        text: "Amount",
        value: "amount"
      },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    ...mapGetters({
      stock: "fridge/getStock"
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
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>

.v-data-table {
  padding: -20px 0% 0% 0%;
  
}

</style>