<template>
  <v-app-bar>
    <v-toolbar-title class="headline text-uppercase">
      <router-link
        v-if="!isAuthenticated"
        class="btnlink"
        to="/"
      >
        <v-img
          :src="logo"
          height="40%"
          width="120px"
          alt="Fridgein Logo"
        />
      </router-link>
      <router-link
        v-if="isAuthenticated"
        class="btnlink"
        to="/dashboard"
      >
        <v-img
          :src="logo"
          height="40%"
          width="120px"
          alt="Fridgein Logo"
        />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <label
        v-if="isAuthenticated"
        id="loggedin-toolbar-label"
        class="logged-in-common"
      >Logged in as <b>{{ profile.nickname }}</b></label>
      <v-btn
        v-if="!isAuthenticated"
        text
        to="/"
        class="btnlink"
      >
        Home
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        text
        to="/dashboard"
        class="btnlink"
      >
        Dashboard
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        text
        to="/food"
        class="btnlink"
      >
        Stock
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        text
        to="/recipes"
        class="btnlink"
      >
        Recipes
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        text
        to="/profile"
        class="btnlink"
      >
        Profile
      </v-btn>
      <v-btn
        v-if="!isAuthenticated"
        id="loginBtn"
        text
        class="btnlink"
        @click.prevent="login"
      >
        Log in
      </v-btn>
      <v-btn
        v-if="isAuthenticated"
        id="loginBtn"
        text
        class="btnlink"
        @click.prevent="logout"
      >
        Log out
      </v-btn>
    </v-toolbar-items>

    <v-menu
      id="burger-menu"
      class="hidden-md-and-up"
      :offset-x="offset"
      transition="slide-x-transition"
      right
      max-width="50%"
    >
      <v-app-bar-nav-icon v-slot:activator="{ on }" />
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isAuthenticated"
          to="/food"
        >
          <v-list-tile-content>
            <v-list-tile-title>Stock</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isAuthenticated"
          to="/recipes"
        >
          <v-list-tile-content>
            <v-list-tile-title>Recipes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isAuthenticated"
          to="/profile"
        >
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated">
          <v-list-tile-content>
            <Label
              id="loggedin-menu-label"
              class="logged-in-common"
            >Logged in as {{ profile.nickname }}</Label>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isAuthenticated">
          <v-btn
            id="loginBtn"
            text
            value="Log in button"
            class="btnlink"
            @click.prevent="login"
          >
            Log in
          </v-btn>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated">
          <v-btn
            id="loginBtn"
            text
            value="Log out button"
            class="btnlink"
            @click.prevent="logout"
          >
            Log out
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-app-bar>
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