<template>
  <v-toolbar>
    <v-toolbar-title class="headline text-uppercase">
      <router-link v-if="!isAuthenticated" to="/">
        <v-img :src="logo" height="40%" width="120px" alt="Fridgein Logo" />
      </router-link>
      <router-link v-if="isAuthenticated" to="/dashboard">
        <v-img :src="logo" height="40%" width="120px" alt="Fridgein Logo" />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    
      <v-toolbar-items class="hidden-sm-and-down">
        <label v-if="isAuthenticated" id="loggedin-toolbar-label" class="logged-in-common">
          Logged in as
          <b>{{ profile.nickname }}</b>
        </label>
        <v-tabs color="#90ccf4" id="toolbar-tabs" optional>
          <v-tab v-if="!isAuthenticated" to="/" class="toolbar-tab">Home</v-tab>
          <v-tab v-if="isAuthenticated" to="/dashboard" class="toolbar-tab">Dashboard</v-tab>
          <v-tab v-if="isAuthenticated" to="/food" class="toolbar-tab">Stock</v-tab>
          <v-tab v-if="isAuthenticated" to="/recipes" class="toolbar-tab">Recipes</v-tab>
          <v-tab v-if="isAuthenticated" to="/profile" class="toolbar-tab">Profile</v-tab>
        </v-tabs>
        <v-btn v-if="!isAuthenticated" class="login-btn" text @click.prevent="login">Log in</v-btn>
        <v-btn v-if="isAuthenticated" class="login-btn" text @click.prevent="logout">Log out</v-btn>
      </v-toolbar-items>
    
    <div class="hidden-md-and-up">
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
              <span>Home</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/food">
            <v-list-item-content>
              <span>Stock</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/recipes">
            <v-list-item-content>
              <span>Recipes</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" to="/profile">
            <v-list-item-content>
              <span>Profile</span>
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
            <v-btn class="login-btn" text value="Log in button" @click.prevent="login">Log in</v-btn>
          </v-list-item>
          <v-list-item v-if="isAuthenticated">
            <v-btn class="login-btn" text value="Log out button" @click.prevent="logout">Log out</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
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
.v-toolbar {
  height: 50px;
}

#toolbar-tabs {
  margin: 10px -15px 0% 0%;
  width: 100%;
  height: 50%;
}

.toolbar-tab {
  color: #90ccf4;
  font-size: 13px;
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

.login-btn {
  
  color: white;
  background-color: #90ccf4;
}
</style>