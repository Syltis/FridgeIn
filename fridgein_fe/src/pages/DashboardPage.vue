<template>
  <div>
    <PageTitle title="Welcome!" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.profile
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
#title {
  color: black;
  padding: 0% 0% 0% 0.4%;
}
</style>