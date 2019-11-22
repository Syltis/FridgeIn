<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card class="formCard">
    <v-form ref="form">
      <v-container>
        <v-row>
          <!-- Row one -->
          <v-col cols="12" class="formFlex">
            <h1 class="display-2 font-weight-thin">Add to your stock</h1>
            <v-spacer />
          </v-col>

          <!-- Row two -->
          <v-col cols="12" md="8" class="formFlex">
            <FoodSelect @foodSelected="onFoodSelected" />
          </v-col>

          <!-- Row three -->
          <v-col cols="12" md="5" class="formFlex">
            <v-text-field
              v-model="stockItemName"
              label="Food Name"
              :rules="nameTypeRules"
              :counter="25"
              required
            />
          </v-col>

          <v-col cols="12" md="5" class="formFlex">
            <v-text-field
              v-model="stockItemType"
              label="Type"
              :rules="nameTypeRules"
              :counter="25"
              required
            />
          </v-col>

          <!-- Row four -->
          <v-col cols="12" md="4" class="formFlex">
            <v-dialog ref="dialog" v-model="modal" width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="purchaseDate"
                  label="Purchase Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="purchaseDate" scrollable @input="modal = false" />
            </v-dialog>
          </v-col>
          <v-col cols="12" md="1" class="formFlex">
            <v-checkbox
              id="expirationCheckBox"
              v-model="expiresCheckbox"
              label="Expirable"
              persistent-hint
              @click.native="atChecked"
            />
          </v-col>
          <v-spacer cols="1" md="1" />
          <v-col cols="12" md="4" class="formFlex">
            <div v-if="expirationCheckBox">
              <v-dialog ref="dialog" v-model="modal2" width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="expirationDate"
                    label="Expiration Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="expirationDate" scrollable @input="modal2 = false" />
              </v-dialog>
            </div>
          </v-col>

          <!-- Row five -->
          <v-col cols="12" md="6" class="formFlex">
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

          <!-- Row six -->
          <v-col cols="12" md="12">
            <v-btn class="form-btn" :disabled="!valid" color="success" @click="validate">submit</v-btn>
            <v-btn class="form-btn" color="warning" @click="reset">clear</v-btn>
            <!-- <v-btn @click="deleteType" color="error">delete type</v-btn> -->
          </v-col>
          <v-col cols="12" md="4">
            <v-card v-if="errors.length" class="response-card" color="error">
              <ul>
                <li v-for="error in errors" :key="error" class="responseText">{{ error }}</li>
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
  </v-card>
</template>

<script>
import "es6-promise/auto";
import FoodSelect from "./FoodSelect";
import { mapGetters } from "vuex";
import fridgeService from "../../services/fridgeService";

export default {
  name: "AddStockItemForm",
  components: { FoodSelect },
  data() {
    return {
      min: 1,
      max: 10,
      slider: 1,
      amountSaved: 0,
      expiresCheckbox: false,
      itemSaved: "",
      stockItemName: null,
      stockItemType: null,
      purchaseDate: new Date().toISOString().substr(0, 10),
      expirationDate: null,
      expirationCheckBox: false,
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
      ],
      amountSliderRules: [
        v => (v && !isNaN(v)) || "The amount has to be from 1-10"
      ]
    };
  },
  computed: {
    ...mapGetters({
      userId: "app/getUserId"
    })
  },
  methods: {
    atChecked() {
      this.expirationCheckBox = !this.expirationCheckBox;
    },
    submitStockItem() {
      this.errors = [];
      // Setup object for post
      const foodToPost = {
        userid: this.userId,
        name: this.stockItemName.toLowerCase(),
        type: this.stockItemType.toLowerCase(),
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
      this.stockItemName = "";
      this.stockItemType = "";
      this.$refs.form.resetValidation();
      this.expirationCheckBox = false;
      this.expiresCheckbox = false;
      this.slider = 1;
      this.purchaseDate = new Date().toISOString().substr(0, 10);
    },
    onFoodSelected(value) {
      if (value) {
        this.stockItemName = value.name;
        this.stockItemType = value.type;
      }
    }
  }
};
</script>

<style scoped>
.formCard {
  width: auto;
  padding: 2%;
  width: 100%;
}

.formFlex {
  margin: 0% 1% 1% 1%;
}

.responseText {
  color: white;
}

.form-btn {
  margin: 0% 2% 0% 0%;
}

.response-card {
  padding: 5%;
  margin: 5% 10% 0% 3%;
}
</style>