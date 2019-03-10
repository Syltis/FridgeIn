<!-- npm run serve -- --port8090 -->

<template>
	<div id="app">
		<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
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
        // async / await version (created() becomes async created())
        //
        // try {
        //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
        //   this.posts = response.data
        // } catch (e) {
        //   this.errors.push(e)
        // }
    }
    /*import HelloWorld from './components/HelloWorld.vue'

	export default {
	  name: 'app',
	  components: {
		HelloWorld
	  }
	}*/
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
