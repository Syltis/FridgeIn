<template>
    <v-app>
        <div id="header">
            <navigation-bar></navigation-bar>
        </div>
        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>
        <div id="footer">
            <bottom-bar></bottom-bar>
        </div>
    </v-app>
</template>

<script>

</script>

<style scoped>

#footer {
    margin-top: 5%;
}
</style>
