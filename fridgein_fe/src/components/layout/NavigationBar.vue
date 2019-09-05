<template>
    <v-toolbar app>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase">
            <router-link class="btnlink" to="/">
                <v-img
                :src="logo"
                height="40px"
                width="120px"
                ></v-img>
                <!--<span class="font-weight-light">Fridge</span>
                <span>In</span>-->
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items >
            <v-btn flat to="/foodItems" class="btnlink">Stocks</v-btn>
            <v-btn flat to="/recipes" class="btnlink">Recipes</v-btn>
            <v-btn flat to="contact" class="btnlink">Contact</v-btn>
            <v-btn flat id="loginBtn" class="btnlink">Log in</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Top",
        data() {
            return {
                logo: require("@/assets/images/LogoMakr_3nTx2g.png")
            }
        }
    }
</script>

<style scoped>

    .btnlink {
        text-decoration: none;
        color: inherit;
    }

    #loginBtn {
        color: white;
        background-color: #90CCF4;
    }

</style>