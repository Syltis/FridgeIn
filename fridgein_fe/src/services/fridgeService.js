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
        await stockItemRepository.readUniqueOnUser(store.getters['app/getEmail']).then(response => {
            store.dispatch('fridge/updateStock', response.data);
        });
    },
    
    // Post food with stockItems included
    async postFood(food) {
        await foodRepository.post(food).then(response => {
            store.dispatch('fridge/addFood', response.data);
        });
    },
    async deleteStock(stockIds, userId) {
        await stockIds.forEach(element => {
            // eslint-disable-next-line
            stockItemRepository.delete(element, userId).then(response => {
                store.dispatch('fridge/deleteStock', element);
            });
        });
    }
}

