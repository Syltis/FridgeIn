import { repositoryFactory } from '../repository/repositoryFactory';
import store from '../store/index';

const stockItemRepository = repositoryFactory.get("stockItem");
const foodRepository = repositoryFactory.get("food");

export default {
    async updateFood() {
        console.log("updating food");
        await foodRepository.readAllOnUser(store.getters['app/getUserId']).then(response => {
            store.dispatch('fridge/updateFood', response.data);
        });
    },

    async updateStock() {
        console.log("updating stock");
        await stockItemRepository.getGroupedOnUser(store.getters['app/getEmail']).then(response => {
            store.dispatch('fridge/updateStock', response.data);
        });
    },

    async updateStockOnType() {
        console.log("updating stock on type");
        await stockItemRepository.getGroupedByTypeOnUser(store.getters['app/getEmail']).then(response => {
            store.dispatch('fridge/updateStockByType', response.data);
        })
    },

    // Post food with stockItems included
    async postFood(food) {
        console.log(food);
        await foodRepository.post(food).then(response => {
            store.dispatch('fridge/addFood', response.data);
        });
    },
    async deleteStock(stockIds, userId) {
        console.log(stockIds);
        await stockIds.forEach(element => {
            console.log(userId);
            // eslint-disable-next-line
            stockItemRepository.delete(element, userId).then(response => {
                store.dispatch('fridge/deleteStock', element);
            });
        });
    },
    getStockAmount() {
        var count = 0;
        store.getters['fridge/getStock'].forEach(arr => {
            count += arr.length;
        })
        return count;
    },
    getFoodAmount() {
        return store.getters['fridge/getFood'].length;
    }
}

