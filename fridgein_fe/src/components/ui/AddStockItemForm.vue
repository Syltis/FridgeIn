<template id="addStockItemForm" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-form v-model="valid" ref="form">
        <v-text-field
                label="Food Name"
                v-model="name"
                :rules="nameRules"
                :counter="15"
                required
        ></v-text-field>
        <v-text-field
                label="Type"
                required
        ></v-text-field>
        <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md4>
                <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        lazy
                        full-width
                        width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="date"
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
            </v-flex>
            <v-spacer></v-spacer>
        </v-layout>

        <v-checkbox
                label="Expirable?"
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                required
        ></v-checkbox>

        <v-btn @click="submit" :class="{ red: !valid, green: valid }">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "AddStockItemForm"
    }
</script>

<style scoped>

</style>