<template>
  <v-app-bar>
    <v-toolbar-title class="headline text-uppercase">
      <router-link v-if="!isAuthenticated" class="btnlink" to="/">
        <v-img :src="logo" height="40%" width="120px" alt="Fridgein Logo" />
      </router-link>
      <router-link v-if="isAuthenticated" class="btnlink" to="/dashboard">
        <v-img :src="logo" height="40%" width="120px" alt="Fridgein Logo" />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <div class="d-none d-sm-flex">
      <v-toolbar-items>
        <label v-if="isAuthenticated" id="loggedin-toolbar-label" class="logged-in-common">
          Logged in as
          <b>{{ profile.nickname }}</b>
        </label>
        <v-btn v-if="!isAuthenticated" text to="/" class="btnlink">Home</v-btn>
        <v-btn v-if="isAuthenticated" text to="/dashboard" class="btnlink">Dashboard</v-btn>
        <v-btn v-if="isAuthenticated" text to="/food" class="btnlink">Stock</v-btn>
        <v-btn v-if="isAuthenticated" text to="/recipes" class="btnlink">Recipes</v-btn>
        <v-btn v-if="isAuthenticated" text to="/profile" class="btnlink">Profile</v-btn>
        <v-btn
          v-if="!isAuthenticated"
          id="loginBtn"
          text
          class="btnlink"
          @click.prevent="login"
        >Log in</v-btn>
        <v-btn
          v-if="isAuthenticated"
          id="loginBtn"
          text
          class="btnlink"
          @click.prevent="logout"
        >Log out</v-btn>
      </v-toolbar-items>
    </div>
    <div class="d-flex d-sm-none">
      <v-menu
        id="burger-menu"
        :offset-x="offset"
        transition="slide-x-transition"
        bottom
        max-width="50%"
      >
        <template #activator="{ on }">
          <v-icon id="burgermenu-icon" v-on="on">menu</v-icon>
        </template>
        <v-list>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/food">
            <v-list-item-content>
              <v-list-item-title>Stock</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/recipes">
            <v-list-item-content>
              <v-list-item-title>Recipes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/profile">
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated">
            <v-list-item-content>
              <Label
                id="loggedin-menu-label"
                class="logged-in-common"
              >Logged in as {{ profile.nickname }}</Label>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!isAuthenticated">
            <v-btn
              id="loginBtn"
              text
              value="Log in button"
              class="btnlink"
              @click.prevent="login"
            >Log in</v-btn>
          </v-list-item>
          <v-list-item v-if="isAuthenticated">
            <v-btn
              id="loginBtn"
              text
              value="Log out button"
              class="btnlink"
              @click.prevent="logout"
            >Log out</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigationBar",
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
  color: #a9a9a9;
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