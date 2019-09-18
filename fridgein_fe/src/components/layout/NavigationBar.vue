<template>
  <v-toolbar>
    <v-toolbar-title class="headline text-uppercase">
      <router-link class="btnlink" to="/">
        <v-img :src="logo" height="40%" width="120px" alt="Fridgein Logo"></v-img>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <label id="loggedin-toolbar-label"  class="logged-in-common" v-if="this.isAuthenticated">Logged in as {{ profile.email }}</label>
      <v-btn flat to="/" class="btnlink">Home</v-btn>
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
      max-width="50%"
    >
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
        <v-list-tile v-if="this.isAuthenticated">
          <v-list-tile-content >
            <Label class="logged-in-common" id="loggedin-menu-label">Logged in as {{ profile.email }}</Label>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isAuthenticated">
          <v-btn flat id="loginBtn" @click.prevent="login" value="Log out button" class="btnlink">Log in</v-btn>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated">
          <v-btn flat id="loginBtn" @click.prevent="logout" value="Log out button" class="btnlink">Log out</v-btn>
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
      isAuthenticated: false,
      profile: this.$auth.profile
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

.logged-in-common {
  color: #A9A9A9;
}

#loggedin-menu-label {
  font-size: 80%;
}

#loggedin-toolbar-label {
  margin: 2% 1% 0% 0%;
}

#loginBtn {
  color: white;
  background-color: #90ccf4;
}
</style>