<template>
    <v-app>
        <div id="header">
            <NavigationBar></NavigationBar>
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
