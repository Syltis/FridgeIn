<template>
  <div v-if="profile">
    <h1 id="title" class="display-1 font-weight-thin mb-3">
      Your profile
    </h1>
    <v-layout row wrap >
      <v-card xs12 md6 id="profile-card">
        <v-layout row wrap>
          <v-flex xs12 md6 class="flexBox">
            <img :src="profile.picture" />
          </v-flex>
          <v-flex xs12 md6 class="flexBox">
            <h2>{{ profile.nickname }}</h2>
            <p>{{ profile.email }}</p>
            <p id="verified" v-if="profile.email_verified">Email verified</p>
            <p id="not-verified" v-if="!profile.email_verified">Email not yet verified</p>
          </v-flex>
          <v-flex xs12 md6 class="flexBox">
            <p>
              Last update at
              <b>{{ updatedAt }}</b>
            </p>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card xs12 md6 id="statistics-card">
      <UserStatistics />
      </v-card>
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
    updatedAt() {
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
  color: green;
}
#noy-verified {
  color: red;
}

#profile-card {
  margin: 1% 0.5%;
  padding: 1%;
  width: 50%;
}

#statistics-card {
  margin: 1% 0.5%;
  padding: 1%;
  width: 48%;
}

@media (max-width:  800px) {
  #profile-card {
    width: 100%;
  }

  #statistics-card {
    width: 100%;

    margin-bottom: 10%;
  }
}

.flexBox {
  margin: 1% 0.5%;
}
</style>