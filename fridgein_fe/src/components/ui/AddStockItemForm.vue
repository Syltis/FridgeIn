<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card class="formCard">
    <v-form ref="form">
      <v-layout row wrap>

        <!-- Row one -->
        <v-flex xs6 class="formFlex">
          <h1 class="display-1 font-weight-thin">Add food to your stock</h1>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex x4 class="formFlex">
          <FoodSelect v-on:foodSelected="onFoodSelected"></FoodSelect>
        </v-flex>

        <!-- Row two -->
        <v-flex xs5 class="formFlex">
          <v-text-field v-model="stockItemName" label="Food Name" :counter="20" required></v-text-field>
        </v-flex>
        <v-spacer xs2></v-spacer>
        <v-flex xs5 class="formFlex">
          <v-text-field v-model="stockItemType" label="Type" :counter="20" required></v-text-field>
        </v-flex>

        <!-- Row three -->
        <v-flex xs4 class="formFlex">
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
        <v-spacer xs1></v-spacer>
        <v-flex xs2 class="formFlex">
          <v-checkbox label="Expirable" @click.native="atChecked" id="expirationCheckBox"></v-checkbox>
        </v-flex>
        <v-spacer xs1></v-spacer>
        <v-flex xs4 class="formFlex">
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

        <!-- Row four-->
        <v-flex xs6 class="formFlex">
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

        <!-- Row five -->
        <v-flex xs12>
          <v-btn @click="checkForm" :disabled="!valid" color="success">submit</v-btn>
          <v-btn @click="reset" color="error">clear</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-card class="response-card" color="error" v-if="errors.length">
            <b class="subheading responseText">Please correct the following errors</b>
            <ul>
              <li class="responseText" v-for="error in errors" v-bind:key="error">{{error}}</li>
            </ul>
          </v-card>
          <v-card class="response-card" color="success" v-if="stockItemSuccess">
            <b class="subheading responseText">{{this.amountSaved}} <b>{{this.stockItemName}}</b> added</b>
          </v-card>
        </v-flex>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>
import 'es6-promise/auto';
import FoodSelect from "./FoodSelect";
import { RepositoryFactory } from "../../api/RepositoryFactory.js";

const foodRepository = RepositoryFactory.get("food");

export default {
  name: "AddStockItemForm",
  components: { FoodSelect },
  data() {
    return {
      max: 10,
      min: 1,
      slider: 1,
      amountSaved: 0,
      stockItemName: null,
      stockItemType: null,
      purchaseDate: new Date().toISOString().substr(0, 10),
      expirationDate: null,
      expirationCheckBox: false,
      e6: [],
      modal: false,
      modal2: false,
      stockItemSuccess: false,
      errors: []
    };
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
            purchaseDate: this.purchaseDate,
            expirationDate: this.expirationDate
          }
        ]
      };
      for (let step = 0; step < this.slider; step++) {
        await foodRepository
          .post(foodToPost);
      }
      this.amountSaved = this.slider;
      this.stockItemSuccess = true;
      this.$store.dispatch('RERENDER_STOCKLISTCOMPONENT');
    },
    valid() {
      return true;
    },
    checkForm(e) {
      this.stockItemSuccess = false;
      this.errors = [];
      if (this.stockItemName && this.stockItemType) this.submitStockItem();
      if (!this.stockItemName) this.errors.push("Name required");
      if (!this.stockItemType) this.errors.push("Type required");
      e.preventDefault();
    },
    reset() {
      this.$refs.form.reset();
    },
    onFoodSelected(value) {
        console.log(value);
        this.stockItemName = value.name;
        this.stockItemType = value.type;
    }
  }
};
</script>

<style scoped>
.formCard {
  padding: 40px;
  min-width: 350px;
  margin-bottom: 3%;
}

.formFlex {
  margin: 2% 1%;
}

.responseText {
  color: white;
}

.response-card {
    padding: 2%;
    margin: 5% 10% 0% 3%;
}

</style>