<template>
  <div v-if="profile">
    <h1 id="title" class="display-1 font-weight-thin mb-3">
      User
      <b>{{ profile.nickname }}</b>
    </h1>
    <v-layout row wrap>
      <v-card xs12 md6 class="profile-card">
        <v-layout row wrap>
          <v-flex xs12 md6 class="flexBox">
            <img :src="profile.picture" />
          </v-flex>
          <v-flex xs12 md6 class="flexBox">
            <h2>{{ profile.nickname }}</h2>
            <p>{{ profile.email }}</p>
            <p id="verified" v-if="profile.email_verified">Email verified</p>
          </v-flex>
          <v-flex xs12 md6 class="flexBox">
            <p>
              Last update at
              <b>{{ updatedAT }}</b>
            </p>
          </v-flex>
        </v-layout>
      </v-card>
      <UserStatistics />
    </v-layout>
  </div>
</template>

<script>
import UserStatistics from "./../components/ui/UserStatistics";

export default {
  components: { UserStatistics },
  data() {
    return {
      profile: this.$auth.profile,
      verifiedEmail: false
    };
  },
  computed: {
    updatedAT() {
      return this.profile.updated_at.substring(0, 10);
    }
  },
  methods: {
    changeUser() {
      console.log(this.profile.email_verified);
    },
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

#verified {
  color: grey;
}

.profile-card {
  margin: 1% 0.5%;
  padding: 1%;
  width: 49%;
}

.flexBox {
  margin: 1% 0.5%;
}
</style>