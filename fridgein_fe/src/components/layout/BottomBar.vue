<template>
  <v-footer dark>
    <v-card class="flex" color="#5DA2D5">
      <v-card-title class="justify-center" align="center">Made by Kristoffer Sylte Dahl</v-card-title>
      <v-card-text class="grey darken-2 justify-center text-truncate" align="right">
        <v-layout row wrap>
          <v-flex xs6>&copy;2018</v-flex>
          <v-flex xs1>
            <v-img :src="logo" id="bottomIcon" height="30px" width="100px"></v-img>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/images/LogoIcon.png")
    };
  }
};
</script>
<style scoped>
#bottomIcon {
  margin: auto;
}
</style>