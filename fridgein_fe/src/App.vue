<template>
  <v-app>
    <div id="header">
      <NavigationBar app />
    </div>
    <v-content>
      <v-container fluid >
        <router-view />
      </v-container>
    </v-content>
    <BottomBar app />
  </v-app>
</template>

<script>


</script>

<style>
#footer {
  margin-top: 5%;
}

.application--wrap {
    min-height: 96.2vh;
}


</style>
