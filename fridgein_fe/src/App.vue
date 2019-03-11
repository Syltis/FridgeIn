<template>
    <div>
        <div id="header">
            <navigation-bar></navigation-bar>
        </div>
        <hr>
        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>
        <div id="footer">
            <bottom-bar></bottom-bar>
        </div>
    </div>
</template>

<script>
</script>
