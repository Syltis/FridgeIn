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
        await foodRepository.post(food).then(response => {
            var result = response;
            var stockitemResult = response.data.stockitem;
            store.dispatch('fridge/addFood', result.data);
            store.dispatch('fridge/addStockByType', stockitemResult);
        });
    },
    async deleteStock(stockIds, userId) {
        await stockIds.forEach(id => {
            // eslint-disable-next-line
            stockItemRepository.delete(id, userId).then(response => {
                store.dispatch('fridge/deleteStock', id);
                store.dispatch('fridge/deleteStockByType', id);
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
    },
    getPieChartStock() {
        var stockByType = store.getters['fridge/getStockByType'];
        var barChartArr = [stockByType.length + 1]
        barChartArr[0] = ['Type', 'Amount'];
        for (let i = 0; i < stockByType.length; i++) {
            const arr = stockByType[i];
            if (typeof arr[0] !== 'undefined') {
                barChartArr[i + 1] = ([this.capitalize(arr[0].food.type), arr.length]);
            }
        }
        return barChartArr;
    },

    // Helpers
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

