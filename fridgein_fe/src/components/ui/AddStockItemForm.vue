<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card class="formCard">
        <v-layout row wrap>

            <!-- Row one -->
            <v-flex xs6 class="formFlex">
                <h1 class="display-1 font-weight-thin">
                    Add food to your stock
                </h1>
                <v-spacer></v-spacer>
            </v-flex>
            <v-flex x4 class="formFlex">
                <FoodItemSelect></FoodItemSelect>
            </v-flex>

            <!-- Row two -->
            <v-flex xs5 class="formFlex">
                <v-text-field
                        v-model="stockItemName"
                        label="Food Name"
                        :counter="20"
                        required
                ></v-text-field>
            </v-flex>
            <v-spacer xs2></v-spacer>
            <v-flex xs5 class="formFlex">
                <v-text-field
                        v-model="stockItemType"
                        label="Type"
                        :counter="20"
                        required
                ></v-text-field>
            </v-flex>

            <!-- Row three -->
            <v-flex xs4 class="formFlex">
                <v-dialog
                        v-model="modal"
                        ref="dialog"
                        lazy
                        full-width
                        width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="purchaseDate"
                                label="Purchase Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="purchaseDate" @input="modal = false"
                                   scrollable></v-date-picker>
                </v-dialog>
            </v-flex>
            <v-spacer xs1></v-spacer>
            <v-flex xs2 class="formFlex">
                <v-checkbox
                        label="Expirable"
                        @click.native="atChecked"
                        id="expirationCheckBox"
                ></v-checkbox>
            </v-flex>
            <v-spacer xs1></v-spacer>
            <v-flex xs4 class="formFlex">
                <div v-if="expirationCheckBox">
                    <v-dialog
                            v-model="modal2"
                            ref="dialog"
                            lazy
                            full-width
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="expirationDate"
                                    label="Expiration Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="expirationDate" @input="modal2 = false"
                                       scrollable></v-date-picker>
                    </v-dialog>
                </div>
            </v-flex>

            <!-- Row four -->
            <v-flex xs12>
                <v-btn @click="checkForm"
                       :disabled="!valid"
                       color="success"
                >
                    submit
                </v-btn>
                <v-btn @click="reset" color="error">clear</v-btn>
                <span class="font-weight-bold" v-if="stockItemSuccess">
                        Food added to stock!
                    </span>
            </v-flex>
            <v-flex xs12>
                <p v-if="errors.length">
                    <b>Please correct the following errors</b>
                    <ul>
                        <li v-for="error in errors" v-bind:key="error">{{error}}</li>
                    </ul>
                </p>
            </v-flex>
        </v-layout>
    </v-card>

</template>

<script>
    import FoodItemSelect from "./FoodItemSelect";
    import {RepositoryFactory} from '../../api/RepositoryFactory.js'

    const foodItemRepository = RepositoryFactory.get('foodItem');

    export default {
        name: "AddStockItemForm",
        components: {FoodItemSelect},
        data() {
            return {
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
            }
        },
        methods: {
            atChecked() {
                this.expirationCheckBox = !this.expirationCheckBox;
            },
            async submitStockItem() {
                this.errors = [];
                await foodItemRepository.post({
                    stockItems: [
                        {
                            purchaseDate: this.purchaseDate,
                            expirationDate: this.expirationDate
                        }
                    ],
                    name: this.stockItemName.toLowerCase(),
                    type: this.stockItemType.toLowerCase()
                }).then(this.errors.push("Food added to stock"));
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
                e.preventDefault()
            },
            reset() {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

    .formCard {
        padding: 40px;
        min-width: 350px;

    }

    .formFlex {
        margin: 3% 2% 2%;
    }

</style>