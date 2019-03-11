<template id="foodItemList">
	<div id="list">
		<ul v-if="fooditems && fooditems.length">
		<v-list two-line>
			<template v-for="fooditem in fooditems">
				<v-list-tile
				:key="fooditem.name"
				avatar
				ripple
				>
				<v-list-tile-content>
					<v-list-tile-title>{{fooditem.name}}</v-list-tile-title>
					<v-list-tile-sub-title class="text--primary">{{fooditem.type}}</v-list-tile-sub-title>
				</v-list-tile-content>
				</v-list-tile>
				<v-divider></v-divider>
			</template>

		</v-list>

		</ul>
		<hr>
	</div>
</template>

<script>
    import axios from 'axios'

    export default {

        name: "FoodItemList",
        data() {
            return {fooditems : []}
        },
        mounted() {
            this.fetchFoodItems();
        },
        methods: {
            fetchFoodItems() {
                axios.get("http://localhost:8080/fooditems")
                    .then(response => {
                        this.fooditems = response.data;
                    })
            }
        },
    }
</script>

<style scoped>
	#foodItemList {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
