import Repository from './Repository';

const resource = '/stockitem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readUnique() {
        return Repository.get(`${resource}` + '/readunique');
    },
    readUniqueOnUser(email) {
        return Repository.get(`${resource}` + '/readuniqueonuser/' + email);
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem);
    },
    delete(id, userId) {
        return Repository.delete(`${resource}` + '/del/' + id + '/' + userId);
    },
    deleteAll(id, userId) {
        return Repository.delete(`${resource}` + '/delall/' + id + '/' + userId);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + '/delallname/' + name);
    }
}
