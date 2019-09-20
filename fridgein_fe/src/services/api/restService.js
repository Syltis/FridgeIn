import { repositoryFactory } from './repository/repositoryFactory';
import store from '../../store/index';

const stockItemRepository = repositoryFactory.get("stockItem");
const foodRepository = repositoryFactory.get("food");

export default {
    updateData() {
        this.getFood();
        this.getStock();
    },
    async getFood() {
        console.log(store.getters['app/userId']);
        const { data } = await foodRepository.readAllOnUser(store.getters['app/userId']);
        this.updateFood(data);
    },
    async getStock() {
        console.log(store.getters['app/email'])
        const { data } = await stockItemRepository.readUniqueOnUser(store.getters['app/email']);
        this.updateStock(data);
    },
    updateFood(payload) {
        store.dispatch('fridge/updateFood', payload);
    },
    updateStock(payload) {
        store.dispatch('fridge/updateStock', payload);

    }
}

