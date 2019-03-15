<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-flex class="flexBox">
        <v-card class="formCard">
            <v-layout row wrap>
                <h4 class="display-1">
                    Add food to your stock
                </h4>
                <v-spacer></v-spacer>
                <v-flex x6>
                    <v-select
                            v-model="fooditem"
                            :items="fooditems"
                            item-text="name"
                            :menu-props="{ maxHeight: '400' }"
                            label="Pick an item from your saved foods"
                            hint="Creating a new one will save it to this list."
                            persistent-hint
                    ></v-select>
                </v-flex>
                <v-flex xs12>
                    <v-form ref="form">
                        <v-text-field
                                label="Food Name"
                                :counter="15"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Type"
                                required
                        ></v-text-field>
                        <v-layout row wrap>
                            <v-spacer></v-spacer>
                            <v-flex xs12>
                                <v-dialog
                                        ref="dialog"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                label="Bought At"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                                <v-checkbox
                                        label="Expirable?"
                                        @click="atChecked"
                                        id="expirationCheckBox"
                                ></v-checkbox>
                                <div v-if="expirationCheckBox">
                                    <v-dialog
                                            ref="dialog"
                                            :return-value.sync="date"
                                            persistent
                                            lazy
                                            full-width
                                            width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    label="Expiration Date"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </div>
                            </v-flex>
                        </v-layout>
                            <v-spacer></v-spacer>
                            <v-flex xs12>
                                <v-btn @click="submit" :class="{ red: !valid, green: valid }">submit</v-btn>
                                <v-btn @click="clear">clear</v-btn>
                            </v-flex>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "AddStockItemForm",
        data() {
            return {
                expirationCheckBox: false,
                e6: [],
                fooditems: []
            }
        },
        mounted() {
            this.fetchFoodItems();
        },
        methods: {
            atChecked() {
                this.expirationCheckBox = !this.expirationCheckBox;
            },
            fetchFoodItems() {
                axios.get('http://localhost:8080/api/fooditems')
                    .then(response => {
                        this.fooditems = response.data
                    })
            },
            valid() {
                return true;
            }
        }
    }
</script>

<style scoped>

    .formCard {
        padding: 40px;

    }

    .flexBox {
        margin: 30px;
        min-width: 30%;
        max-width: 50%;
    }
</style>