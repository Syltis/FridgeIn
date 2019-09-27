import Repository from './repository';

const resource = 'food/';
export default {
    readAllOnUser(userId) {
        return Repository.get(`${resource}` + 'readallonuser/' + userId);
    },
    post(food) {
        return Repository.post(`${resource}`, food);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + 'delallname/' + name);
    }
}