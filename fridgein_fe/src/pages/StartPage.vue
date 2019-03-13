<template>
    <div>
        <v-layout row wrap>
            <v-flex>
                <no-ssr>
                    <v-img src="src/assets/images/header-fresh-produce.jpg" alt=""></v-img>
                </no-ssr>
            </v-flex>
            <v-flex>
                <v-card>
                    <v-card-title primary-title class="green">
                        <h6 class="title">
                            We at FridgeIn wants to help <strong>you</strong> keep better track of your stores. Out goal
                            is to reduce food
                            waste and make life easier for our users.
                        </h6>
                    </v-card-title>
                    <v-card-text>
                        <p class="font-weight-regular">
                            Our site gives you the tools you need to optimize your kitchen stores.
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>
    export default {
        name: "StartPage"
    }
</script>

<style scoped>

    .title {
        color: white;
    }
</style>