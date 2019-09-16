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
      <v-btn flat v-if="this.isAuthenticated" to="/food" class="btnlink">Stock</v-btn>
      <v-btn flat v-if="this.isAuthenticated" to="/recipes" class="btnlink">Recipes</v-btn>
      <v-btn flat v-if="!this.isAuthenticated" id="loginBtn" class="btnlink" @click.prevent="login">Log in</v-btn>
      <v-btn flat v-if="this.isAuthenticated" id="loginBtn" class="btnlink" @click.prevent="logout">Log out</v-btn>
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
        <v-list-tile to="/food" v-if="this.isAuthenticated">
          <v-list-tile-content>
            <v-list-tile-title>Stock</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  to="/recipes" v-if="this.isAuthenticated">
          <v-list-tile-content >
            <v-list-tile-title>Recipes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isAuthenticated">
          <v-btn flat id="loginBtn" @click.prevent="login" class="btnlink">Log in</v-btn>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated">
          <v-btn flat id="loginBtn" @click.prevent="logout" class="btnlink">Log out</v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      logo: require("@/assets/images/LogoMakr_3nTx2g.png"),
      menu: [
        { to: "/food", text: "Stock" },
        { to: "/recipes", text: "Recipes" }
      ],
      offset: true,
      isAuthenticated: false
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    login() {
      console.log("login attempt");
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
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