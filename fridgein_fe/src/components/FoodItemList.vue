<!-- npm run serve -- --port8090 -->

<template id="foodItemList">
	<div id="list">
		<p><strong>Food Items</strong></p>
		<ul v-if="fooditems && fooditems.length">
			<li v-for="fooditem in fooditems" v-bind:key="type">
				<p><strong>{{fooditem.name}}</strong></p>
			</li>
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

<style>
	#foodItemList {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
