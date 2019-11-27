<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input v-model="username" required type="text" placeholder="Snoopy">
      <label>Password</label>
      <input v-model="password" required type="password" placeholder="Password">
      <hr>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
    methods: {
        login() {
            const { username, password } = this;
            this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                this.$router.push('/');
            })
        }
    }
}
</script>