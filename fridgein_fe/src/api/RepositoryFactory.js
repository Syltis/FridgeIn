import FoodRepository from './FoodRepository';
import StockItemRepository from './StockItemRepository';

const repositories = {
    food: FoodRepository,
    stockItem: StockItemRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};