<template>
  <v-app>
    <div id="header">
      <navigation-bar app></navigation-bar>
    </div>
    <v-content>
      <v-container fluid >
        <router-view />
      </v-container>
    </v-content>
    <bottom-bar app></bottom-bar>
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
