<template>
  <div>
    <v-data-table
      :dense="$vuetify.breakpoint.xs"
      :mobile-breakpoint="530"
      :headers="headers"
      :items="uniqueStockitems"
    >
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
                <span class="display-2 font-weight-regular">Add to your Stock</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <FoodSelect @foodSelected="onFoodSelected" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.name" label="Food name" />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field v-model="editedItem.type" label="Type" />
                      </v-col>
                      <v-col cols="7">
                        <v-dialog ref="dialog" v-model="modal" width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.purchaseDate"
                              label="Purchase Date"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.purchaseDate"
                            scrollable
                            @input="modal = false"
                          />
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-checkbox
                          id="expirationCheckBox"
                          v-model="expiresCheckbox"
                          label="Expirable"
                          persistent-hint
                          @click.native="atChecked"
                        />
                      </v-col>
                      <v-col cols="12" sm="7">
                        <div v-if="expirationCheckBox">
                          <v-dialog ref="dialog" v-model="modal2" width="290px">
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.expirationDate"
                                label="Expiration Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.expirationDate"
                              scrollable
                              @input="modal2 = false"
                            />
                          </v-dialog>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <v-slider
                          v-model="slider"
                          label="Amount"
                          class="align-center"
                          thumb-label="always"
                          :max="max"
                          :min="min"
                          hide-details
                          :rules="amountSliderRules"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-card v-if="errors.length" class="response-card" color="error">
                          <ul>
                            <li
                              v-for="error in errors"
                              :key="error"
                              class="responseText"
                            >{{ error }}</li>
                          </ul>
                        </v-card>
                        <v-card v-if="stockItemSuccess" class="response-card" color="success">
                          <b class="subtitle-1 responseText">
                            {{ amountSaved }}
                            <b>{{ itemSaved }}</b> added
                          </b>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" :disabled="!valid" text @click="validate">Save</v-btn>
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
import FoodSelect from "./FoodSelect";

export default {
  name: "StockItemDataTable",
  components: {
    FoodSelect
  },
  filters: {
    onlyDate: function(datetime) {
      return datetime != null ? datetime.substring(0, 10) : "";
    },
    capitalize: function(string) {
      return string != null
        ? string.charAt(0).toUpperCase() + string.slice(1)
        : "";
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
    modal: false,
    modal2: false,
    expirationCheckBox: false,
    expiresCheckbox: false,
    min: 1,
    max: 10,
    slider: 1,
    amountSaved: 0,
    stockItemSuccess: false,
    errors: [],
    nameTypeRules: [
      v => !!v || "Field is required",
      v =>
        /^[ a-zæøåA-ZÆØÅ0-9\s]+$/.test(v) ||
        "Field can only contain alphabetical characters",
      v => (v && v.length <= 25) || "Field must be less than 25 characters"
    ],
    amountSliderRules: [
      v => (v && !isNaN(v)) || "The amount has to be from 1-10"
    ],
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
    atChecked() {
      this.expirationCheckBox = !this.expirationCheckBox;
    },
    onFoodSelected(value) {
      if (value) {
        this.editedItem.name = value.name;
        this.editedItem.type = value.type;
      }
    },
    submitStockItem() {
      this.errors = [];
      // Setup object for post
      const foodToPost = {
        userid: this.userId,
        name: this.editedItem.name.toLowerCase(),
        type: this.editedItem.type.toLowerCase(),
        stockitem: []
      };
      // Multiply Stockitems on chosen amount
      for (let step = 0; step < this.slider; step++) {
        foodToPost.stockitem.push({
          userid: this.userId,
          purchaseDate: this.purchaseDate,
          expirationDate: this.expirationDate
        });
      }
      fridgeService.postFood(foodToPost);
      this.amountSaved = this.slider;
      this.itemSaved = this.stockItemName;
      this.stockItemSuccess = true;
      this.reset();
    },
    valid() {
      return true;
    },
    validate() {
      if (
        this.editedItem.name == "Nugatti" ||
        this.editedItem.name == "nugatti"
      ) {
        this.errors.push("Nugatti skal ikke i kjøleskapet.");
        return;
      }
      if (this.$refs.form.validate()) {
        this.submitStockItem();
      }
    },
    reset() {
      this.errors = [];
      this.stockItemName = "";
      this.stockItemType = "";
      this.$refs.form.resetValidation();
      this.expirationCheckBox = false;
      this.expiresCheckbox = false;
      this.slider = 1;
      this.purchaseDate = new Date().toISOString().substr(0, 10);
    },
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