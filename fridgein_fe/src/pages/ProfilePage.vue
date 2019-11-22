<template>
  <div v-if="profile">
    <PageTitle title="Your Profile" />
    <v-row>
      <v-card id="profile-card" xs="12" md="6">
        <v-row>
          <v-col md="6" class="colBox xs">
            <img :src="profile.picture">
          </v-col>
          <v-col md="6" class="colBox xs">
            <h2>{{ profile.nickname }}</h2>
            <p>{{ profile.email }}</p>
            <p v-if="profile.email_verified" id="verified">Email verified</p>
            <p v-if="!profile.email_verified" id="not-verified">Email not yet verified</p>
          </v-col>
          <v-col md="6" class="colBox xs">
            <p>
              Last update at
              <b>{{ updatedAt }}</b>
            </p>
          </v-col>
        </v-row>
      </v-card>
      <v-card id="statistics-card" xs="12" md="6">
        <UserStatistics />
      </v-card>
    </v-row>
  </div>
</template>

<script>
import UserStatistics from "./../components/user/UserStatistics";

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
  width: 48%;
}

#statistics-card {
  margin: 1% 0.5%;
  padding: 1%;
  width: 50%;
}

@media (max-width: 800px) {
  #profile-card {
    width: 100%;
  }

  #statistics-card {
    width: 100%;

    margin-bottom: 10%;
  }
}

.colBox {
  margin: 1% 0.5%;
}
</style>