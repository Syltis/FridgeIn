import FoodRepository from './foodRepository';
import StockItemRepository from './stockItemRepository';
import UserRepository from './userRepository';

const repositories = {
    food: FoodRepository,
    stockItem: StockItemRepository,
    user: UserRepository
};

export const repositoryFactory = {
    get: name => repositories[name]
};