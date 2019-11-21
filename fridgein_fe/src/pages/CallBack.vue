<template>
  <div>
    <h1 class="display-3 font-weight-thin mb-3">FridgeIn</h1>
  </div>
</template>

<script>
export default {
    created() {
        this.$auth.handleAuthentication();
    },
    methods: {
        handleLoginEvent(data) {
            this.$router.push(data.state.target || "/dashboard");
        }
    }
}
</script>