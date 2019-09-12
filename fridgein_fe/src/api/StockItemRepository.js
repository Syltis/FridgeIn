import Repository from './Repository';

const resource = '/stockitem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readUnique() {
        return Repository.get('https://fridgein-api.azurewebsites.net/api/stockitem/readunique');
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem);
    },
    delete(id) {
        return Repository.delete(`${resource}` + '/del/' + id);
    },
    deleteAll(id) {
        return Repository.delete('https://fridgein-api.azurewebsites.net/api/stockitem/delall/' + id);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + '/delallname/' + name);
    }
}
