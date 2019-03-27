import FoodItemRepository from './FoodItemRepository';
import StockItemRepository from './StockItemRepository';

const repositories = {
    foodItem: FoodItemRepository,
    stockItem: StockItemRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};