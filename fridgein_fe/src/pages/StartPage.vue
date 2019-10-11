<template>
  <div id="page-div">
    <v-parallax dark :src="header1" class="parallax">
      <v-row align="center" justify="center">
        <v-col>
          <v-card id="titleCard">
            <v-card-text class="text-center">
              <h1 class="display-4 font-weight-thin mb-3" id="title-h1">FridgeIn</h1>
              <hr />
              <h4 class="display-1 font-weight-thin">
                Giving you the tools you need to optimize your kitchen
                stores.
              </h4>
              <v-btn
                v-if="!isLoggedIn"
                id="login-btn"
                color="#82b9dd"
                class="white--text"
                large
                rounded
                @click="login"
              >Sign Up / In</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>
    <div class="content">
      <v-row class="my-5">
        <v-col cols="12" sm="4">
          <v-card class="elevation-2">
            <v-card-title primary-title>
              <div class="headline text-center" style="width: 100%">Tracking your stores</div>
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
              nec volutpat.
              Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
              ultricies eros.
              Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="elevation-2">
            <v-card-title primary-title>
              <div class="headline text-center" style="width: 100%">Planning your meals</div>
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
              nec volutpat.
              Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
              ultricies eros.
              Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Nullam
              scelerisque id nunc
              nec volutpat.
              Etiam pellentesque tristique arcu, non consequat magna fermentum ac.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="elevation-2">
            <v-card-title primary-title>
              <div class="headline text-center" style="width: 100%">Reducing food-waste</div>
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
              nec volutpat.
              Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
              ultricies eros.
              Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-parallax dark :src="header2" class="parallax2" />

    <div class="content">
      <v-row class="my-5">
        <v-col cols="12">
          <v-card class="elevation-2">
            <v-card-title primary-title>
              <div class="headline text-center" style="width: 100%">Our mission</div>
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
              nec volutpat.
              Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
              ultricies eros.
              Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem
              neque, posuere
              et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu
              mattis nisl
              maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed
              ipsum ac, gravida
              ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante
              ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae;
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import "es6-promise/auto";
import { mapState } from "vuex";

export default {
  name: "StartPage",
  data() {
    return {
      header1: require("@/assets/images/refrigeratorheader.jpg"),
      header2: require("@/assets/images/foodtable.jpg"),
      logo: require("@/assets/images/LogoBluer.png")
    };
  },
  computed: {
    ...mapState({
      userId: state => state.app.userId
    }),
    isLoggedIn() {
      return this.userId !== "";
    }
  },
  methods: {
    login() {
      console.log("login attempt");
      this.$auth.login();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>

<style scoped>
#titleCard {
  margin: 11% 0%;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.75);
  border-color: transparent !important;
  position: static;
}

#titleCard,
h4 {
  color: black;
}

#titleCard,
h1 {
  font-size: 200px;
}

#login-btn {
  margin: 1.5% 0%;
}

@media (min-width: 1000px) {
  .content {
    width: 75%;
    margin: auto;
  }
  #titleCard {
    margin-top: 180px;
  }
  .parallax {
    min-height: 780px;
  }
  .parallax2 {
    min-height: 580px;
  }
}

.parallax {
  min-height: 580px;
}
</style>