import { repositoryFactory } from './repository/repositoryFactory';
import store from '../../store/index';

const stockItemRepository = repositoryFactory.get("stockItem");
const foodRepository = repositoryFactory.get("food");

export default {
    updateFridge() {
        this.getFood();
        this.getStock();
    },
    updateFood(payload) {
        store.dispatch('fridge/updateFood', payload);
    },
    updateStock(payload) {
        store.dispatch('fridge/updateStock', payload);
    },
    async getFood() {
        await foodRepository.readAllOnUser(store.getters['app/getUserId']).then(response => {
            this.updateFood(response.data);
        });
    },
    async getStock() {
        await stockItemRepository.readUniqueOnUser(store.getters['app/getEmail']).then(response => {
            this.updateStock(response.data);
        });
    },
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

