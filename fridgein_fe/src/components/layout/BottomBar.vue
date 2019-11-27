<template>
  <v-footer dark padless>
    <v-card class="flex" color="#90ccf4">
      <v-card-title class="justify-center" align="center">Made by Kristoffer Sylte Dahl</v-card-title>
      <v-card-text class="grey darken-2 justify-center text-truncate" align="right">
        <v-row>
          <v-col cols="6">&copy;2018</v-col>
          <v-col cols="1">
            <v-img id="bottomIcon" :src="logo" height="30px" width="100px" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "BottomBar",
  data() {
    return {
      logo: require("@/assets/images/LogoIcon.png"),
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  }
};
</script>
<style scoped>
#bottomIcon {
  margin: auto;
}
</style>