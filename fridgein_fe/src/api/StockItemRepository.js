import Repository from './Repository';

const resource = '/stockitem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readUnique() {
        return Repository.get('https://fridgein-api.azurewebsites.net/api/stockitem/readunique');
    },
    readUniqueOnUser(email) {
        return Repository.get('https://fridgein-api.azurewebsites.net/api/stockitem/readuniqueonuser/' + email);
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem);
    },
    delete(id) {
        return Repository.delete(`${resource}` + '/del/' + id);
    },
    deleteAll(id, userId) {
        return Repository.delete('https://fridgein-api.azurewebsites.net/api/stockitem/delall/' + id +'/' + userId);
    },
    deleteAllName(name) {
        return Repository.delete('https://fridgein-api.azurewebsites.net/api/stockitem/delallname/' + name);
    }
}
