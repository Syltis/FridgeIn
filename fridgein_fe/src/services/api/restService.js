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
        await foodRepository.readAllOnUser(store.getters['app/userId']).then(response => {
            this.updateFood(response.data);
        });
    },
    async getStock() {
        await stockItemRepository.readUniqueOnUser(store.getters['app/email']).then(response => {
            this.updateStock(response.data);
        });
    },
    async postFood(food) {
        await foodRepository.post(food).then(response => {
            console.log(response)
            store.dispatch('fridge/addToStock')
        })
    }
}
