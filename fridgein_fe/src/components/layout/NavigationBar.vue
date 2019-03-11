<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <router-link class="rlink" to="/">
                <span class="font-weight-light">Fridge</span>
                <span>In</span>
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
                <router-link class="rlink" to="/foodItems">
                    Stocks
                </router-link>
            </v-btn>
            <v-btn flat>Recipies</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Top"
    }
</script>

<style scoped>

    .rlink {
        text-decoration: none;
        color: inherit;
    }


</style>