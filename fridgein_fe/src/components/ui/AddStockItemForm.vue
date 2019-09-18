<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card class="formCard">
    <v-form ref="form">
      <v-container grid-list-md>
        <v-layout row wrap>
          <!-- Row one -->
          <v-flex xs12 class="formFlex">
            <h1 class="display-1 font-weight-thin">Add to your stock</h1>
            <v-spacer></v-spacer>
          </v-flex>

          <!-- Row two -->
          <v-flex xs12 md8 class="formFlex">
            <FoodSelect v-on:foodSelected="onFoodSelected" :key="foodComponentKey"></FoodSelect>
          </v-flex>

          <!-- Row three -->
          <v-flex xs12 md5 class="formFlex">
            <v-text-field
              v-model="stockItemName"
              label="Food Name"
              :rules="nameTypeRules"
              :counter="25"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5 class="formFlex">
            <v-text-field
              v-model="stockItemType"
              label="Type"
              :rules="nameTypeRules"
              :counter="25"
              required
            ></v-text-field>
          </v-flex>

          <!-- Row four -->
          <v-flex xs12 md4 class="formFlex">
            <v-dialog v-model="modal" ref="dialog" lazy full-width width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="purchaseDate"
                  label="Purchase Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="purchaseDate" @input="modal = false" scrollable></v-date-picker>
            </v-dialog>
          </v-flex>
          <v-spacer xs1 md1></v-spacer>
          <v-flex xs12 md2 class="formFlex">
            <v-checkbox label="Expirable" @click.native="atChecked" id="expirationCheckBox"></v-checkbox>
          </v-flex>
          <v-spacer xs1 md1></v-spacer>
          <v-flex xs12 md4 class="formFlex">
            <div v-if="expirationCheckBox">
              <v-dialog v-model="modal2" ref="dialog" lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="expirationDate"
                    label="Expiration Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="expirationDate" @input="modal2 = false" scrollable></v-date-picker>
              </v-dialog>
            </div>
          </v-flex>

          <!-- Row five -->
          <v-flex xs12 md6 class="formFlex">
            <v-slider
              v-model="slider"
              label="Amount"
              class="align-center"
              thumb-label="always"
              :max="max"
              :min="min"
              hide-details
            ></v-slider>
          </v-flex>

          <!-- Row six -->
          <v-flex xs12 md12>
            <v-btn @click="validate" :disabled="!valid" color="success">submit</v-btn>
            <v-btn @click="reset" color="warning">clear</v-btn>
            <!-- <v-btn @click="deleteType" color="error">delete type</v-btn> -->
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="response-card" color="error" v-if="errors.length">
              <ul>
                <li class="responseText" v-for="error in errors" v-bind:key="error">{{error}}</li>
              </ul>
            </v-card>
            <v-card class="response-card" color="success" v-if="stockItemSuccess">
              <b class="subheading responseText">
                {{this.amountSaved}}
                <b>{{this.itemSaved}}</b> added
              </b>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import "es6-promise/auto";
import FoodSelect from "./FoodSelect";
import { RepositoryFactory } from "../../api/RepositoryFactory.js";

const foodRepository = RepositoryFactory.get("food");
const stockItemRepository = RepositoryFactory.get("stockItem");

export default {
  name: "AddStockItemForm",
  components: { FoodSelect },
  data() {
    return {
      max: 10,
      min: 1,
      slider: 1,
      amountSaved: 0,
      itemSaved: "",
      stockItemName: null,
      stockItemType: null,
      purchaseDate: new Date().toISOString().substr(0, 10),
      expirationDate: null,
      expirationCheckBox: false,
      e6: [],
      modal: false,
      modal2: false,
      stockItemSuccess: false,
      errors: [],
      nameTypeRules: [
        v => !!v || "Field is required",
        v =>
          /^[ a-zæøåA-ZÆØÅ0-9\s]+$/.test(v) ||
          "Field can only contain alphabetical characters",
        v => (v && v.length <= 25) || "Field must be less than 25 characters"
      ]
    };
  },
  computed: {
    foodComponentKey() {
      return this.$store.getters.FOODCOMPONENTKEY;
    }
  },
  methods: {
    atChecked() {
      this.expirationCheckBox = !this.expirationCheckBox;
    },
    async submitStockItem() {
      this.errors = [];
      const foodToPost = {
        name: this.stockItemName.toLowerCase(),
        type: this.stockItemType.toLowerCase(),
        stockitem: [
          {
            userid : this.$store.getters.USER.id,
            purchaseDate: this.purchaseDate,
            expirationDate: this.expirationDate
          }
        ]
      };
      console.log("USER ID");
      console.log(this.$store.getters.USER.id);
      for (let step = 0; step < this.slider; step++) {
        await foodRepository.post(foodToPost).then( result => {
          console.log(result.data);
        });
      }
      this.amountSaved = this.slider;
      this.itemSaved = this.stockItemName;
      this.stockItemSuccess = true;
      this.$refs.form.reset();
      this.$store.dispatch("RERENDER_STOCKLISTCOMPONENT");
      this.$store.dispatch("RERENDER_FOODSELECTCOMPONENT");
    },
    async deleteType() {
      if (
        confirm(
          "Deleting " +
            this.stockItemName +
            " will delete all associated stock!"
        )
      ) {
        await stockItemRepository.deleteAllName(this.stockItemName);
        await foodRepository.deleteAllName(this.stockItemName);
        this.errors.push(this.stockItemName + " has been deleted.");
        this.$refs.form.reset();
        this.$store.dispatch("RERENDER_STOCKLISTCOMPONENT");
        this.$store.dispatch("RERENDER_FOODSELECTCOMPONENT");
      }
    },
    valid() {
      return true;
    },
    validate() {
      if (this.stockItemName == "Nugatti" || this.stockItemName == "nugatti") {
        this.errors.push("Nugatti skal ikke i kjøleskapet.");
        return;
      }
      if (this.$refs.form.validate()) {
        this.submitStockItem();
      }
    },
    reset() {
      this.errors = [];
      this.stockItemSuccess = false;
      this.$refs.form.reset();
    },
    onFoodSelected(value) {
      this.stockItemName = value.name;
      this.stockItemType = value.type;
    }
  }
};
</script>

<style scoped>
.formCard {
  padding: 3%;
  margin-bottom: 5%;
}

.formFlex {
  margin: 1% 1%;
}

.responseText {
  color: white;
}

.response-card {
  padding: 5%;
  margin: 5% 10% 0% 3%;
}
</style>