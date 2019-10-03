import Repository from './repository';
import repository from './repository';

const resource = 'stockitem/';
export default {
    getAllOnUser(userId) {
        return repository.get(`${resource}` + userId);
    },
    delete(id, userId) {
        return Repository.delete(`${resource}` + id + '/' + userId);
    }
}
