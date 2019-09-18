import Repository from './Repository';

const resource = '/food';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readAllOnUser(userId) {
        return Repository.get(`${resource}` + '/readallonuser/' + userId);
    },
    readById(id) {
        return Repository.get(`${resource}` + '/readbyid?id=' + id);
    },
    post(food) {
        return Repository.post(`${resource}` + '/post', food);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + '/delallname/' + name);
    }
}