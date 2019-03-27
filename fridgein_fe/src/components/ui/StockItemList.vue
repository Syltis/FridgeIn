<template id="stockItemList">

	<v-card class="formCard"
	>
		<v-form>
			<v-text-field
					label="Search stock">

			</v-text-field>
		</v-form>
		<div id="list">
			<v-list
					one-line
					style="max-height: 400px"
					class="scroll-y"
			>
				<template v-for="stockItem in stockItems">
					<v-list-tile
							:key="stockItem.name"
							class="listTile"
					>
						<v-list-tile-content>
							<v-list-tile-action-text>
								<span class="left">Bought at {{stockItem.purchaseDate}} &nbsp;</span>
								<span class="right" v-if="stockItem.expirationDate !== null"> Expires at {{stockItem.expirationDate}} </span>
							</v-list-tile-action-text>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>
				</template>
			</v-list>
		</div>
	</v-card>
</template>

<script>
    import {RepositoryFactory} from "../../api/RepositoryFactory";

    const stockItemRepository = RepositoryFactory.get('stockItem');
    const foodItemRepository = RepositoryFactory.get('fooditem');

    export default {
        name: "StockItemList",
        data() {
            return {
                stockItems: [],
                foodItems: []
            }
        },
        mounted() {
            this.fetchStockItems();
        },
        methods: {
            async fetchStockItems() {
                const {data} = await stockItemRepository.readAll();
                this.stockItems = data;
            },
            async fetchFoodItems() {
                const {data} = await foodItemRepository.readAll();
                this.foodItems = data;
            }
        }
    }
</script>

<style scoped>
	#stockItemList {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	.formCard {
		padding: 30px;

	}

</style>