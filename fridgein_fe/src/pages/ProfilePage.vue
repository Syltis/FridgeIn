<template>
  <div v-if="profile">
    <!-- <v-card color="#BDA0BC" class="subheader">
      <v-card-title>
        <h3 class="title">Welcome <b>{{ profile.nickname }}!</b> </h3>
      </v-card-title> 
    </v-card> -->
    <h1 id="title" class="display-2 font-weight-thin mb-3">Welcome {{ profile.nickname }}</h1>
    

    <v-card id="profile-card">
      <v-layout row wrap>
        <v-flex xs12 md6 class="flexBox">
          <div>
            <img :src="profile.picture" />
          </div>
        </v-flex>
        <v-flex xs12 md6 class="flexBox">
          <div>
            <h2>{{ profile.nickname }}</h2>
            <p>{{ profile.email }}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6 class="flexBox">
          <div>
            <pre>{{ JSON.stringify(profile, null, 2) }}</pre>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.profile
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    }
  }
};
</script>

<style scoped>
.subheader {
  margin-top: -0.5%;
}
#title {
  color: black;
  padding: 0% 0% 0% 0.4%;
}

#profile-card {
  margin: 1% 0.5%;
  padding: 1%;
}

.flexBox {
  margin: 1% 0.5%;
}
</style>