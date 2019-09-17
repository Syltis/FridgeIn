import FoodRepository from './FoodRepository';
import StockItemRepository from './StockItemRepository';
import UserRepository from './UserRepository';

const repositories = {
    food: FoodRepository,
    stockItem: StockItemRepository,
    user: UserRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};