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
        await stockItemRepository.getAllOnUser(store.getters['app/getUserId']).then(response => {
            store.dispatch('fridge/updateStock', response.data);
        })
    },
    // Post food with stockItems included
    async postFood(food) {
        await foodRepository.post(food).then(response => {
            var result = response;
            store.dispatch('fridge/addFood', result.data);
        });
    },
    async deleteStock(stockIds, userId) {
        await stockIds.forEach(id => {
            // eslint-disable-next-line
            stockItemRepository.delete(id, userId).then(response => {
                store.dispatch('fridge/deleteStock', id);
            });
        });
    },
    getStockAmount() {
        return store.getters['fridge/getStock'].length;
    },
    getFoodAmount() {
        return store.getters['fridge/getFood'].length;
    },
    getPieChartStock() {
        var stockByType = this.getFormattedStock(store.getters['fridge/getStock'], this.stockitemCompareType);
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

    // Group Stock in a 2D array using a comparator-function returnin a bool.
    getFormattedStock(allStock, compareFunc) {
        let result = [[]]
        var temp = allStock[0]
        result[0].push(temp);
        allStockLoop:
        for (let i = 1; i < allStock.length; i++) {
            const s = allStock[i];
            resultLoop:
            for (let i = 0; i < result.length; i++) {
                const arr = result[i];
                subResultLoop:
                for (let i = 0; i < arr.length; i++) {
                    const ss = arr[i];
                    if (compareFunc(s, ss)) {
                        arr.push(s);
                        continue allStockLoop;
                    } else {
                        continue subResultLoop;
                    }
                }
                continue resultLoop;
            }
            let tempArr = [s];
            result.push(tempArr);
            continue allStockLoop;
        }
        return result;
    },
    // Helpers
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    stockitemCompare(s, ss) {
        return (s.foodId == ss.foodId
            && s.purchaseDate == ss.purchaseDate
            && s.expirationDate == ss.expirationDate);
    },
    stockitemCompareType(s, ss) {
        return (s.food.type == ss.food.type);
    }
}