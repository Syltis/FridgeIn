import Repository from './repository';

const resource = '/stockitem';
export default {
    readUniqueOnUser(email) {
        return Repository.get(`${resource}` + '/readuniqueonuser/' + email);
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem);
    },
    delete(id, userId) {
        return Repository.delete(`${resource}` + '/del/' + id + '/' + userId);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + '/delallname/' + name);
    }
}
