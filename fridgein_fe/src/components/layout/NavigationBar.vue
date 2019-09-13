<template>
  <v-toolbar>
    <v-toolbar-title class="headline text-uppercase">
      <router-link class="btnlink" to="/">
        <v-img :src="logo" height="40%" width="120px"></v-img>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <font-awesome-icon icon="vuejs" />
      <v-btn flat to="/food" class="btnlink">Stock</v-btn>
      <v-btn flat to="/recipes" class="btnlink">Recipes</v-btn>
      <v-btn flat to="contact" class="btnlink">Contact</v-btn>
      <v-btn flat id="loginBtn" class="btnlink" @click="logInClick">Log in</v-btn>
    </v-toolbar-items>

    <v-menu
      id="burger-menu"
      class="hidden-md-and-up"
      :offset-x="offset"
      transition="slide-x-transition"
      right
    >
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-for="item in menu" :key="item.text" :to="item.to">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn flat id="loginBtn" class="btnlink">Log in</v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import AuthService from '../../auth/authService.js';

export default {
  name: "Top",
  data() {
    return {
      logo: require("@/assets/images/LogoMakr_3nTx2g.png"),
      menu: [
        { to: "/food", text: "Stock" },
        { to: "/recipes", text: "Recipes" },
        { to: "contact", text: "Contact" }
      ],
      offset: true
    };
  },
  methods: {
    logInClick() {
      AuthService.login();
    }
  }
};
</script>

<style scoped>
.btnlink {
  text-decoration: none;
  color: inherit;
}

#loginBtn {
  color: white;
  background-color: #90ccf4;
}
</style>