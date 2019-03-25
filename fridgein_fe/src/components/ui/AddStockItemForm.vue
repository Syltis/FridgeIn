<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <v-card class="formCard">
            <v-layout row wrap>

                <!-- Row one -->
                <v-flex xs6>
                    <h1 class="display-1 font-weight-thin">
                        Add food to your stock
                    </h1>
                    <v-spacer></v-spacer>
                </v-flex>
                <v-flex x4>
                    <food-item-select></food-item-select>
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
                    <v-btn @click="submitStockItem"
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
            </v-layout>
        </v-card>

</template>

<script>
    import axios from 'axios'

    export default {
        name: "AddStockItemForm",
        data() {
            return {
                stockItemName: "",
                stockItemType: "",
                purchaseDate: new Date().toISOString().substr(0, 10),
                expirationDate: null,
                expirationCheckBox: false,
                e6: [],
                newFoodItem: null,
                modal: false,
                modal2: false,
                foodItemSuccess: false,
                foodItemError: false,
                stockItemSuccess: false,
                stockItemError: false
            }
        },
        methods: {
            atChecked() {
                this.expirationCheckBox = !this.expirationCheckBox;
            },

            async submitStockItem() {
                // post foodItem
                axios.post('http://localhost:8080/api/fooditem/post', {
                    name: this.stockItemName,
                    type: this.stockItemType
                })
                    .then(response => {
                        this.foodItemSuccess = true;
                        console.log(response);

                        axios.get('http://localhost:8080/api/fooditem/readbyname', {
                            params: {
                                name: this.stockItemName
                            }
                        }).then(response => {
                            // post Stockitem
                            axios.post('http://localhost:8080/api/stockitem/post', {
                                fooditem: response.data,
                                name: this.stockItemName,
                                type: this.stockItemType,
                                purchaseDate: this.purchaseDate,
                                expirationDate: this.expirationDate
                            })
                                .then(response => {
                                    this.stockItemSuccess = true;
                                    console.log(response);
                                })
                                .catch(err => {
                                    this.stockItemError = true;
                                    console.log(err);
                                })
                        })
                            .catch(err => {
                                this.foodItemError = true;
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            valid() {
                return true;
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

    }

    .formFlex {
        margin-top: 3%;
        margin-right: 2%;
        margin-left: 2%;
    }

</style>