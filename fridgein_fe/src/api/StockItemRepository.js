import Repository from './Repository';

const resource = '/stockitem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readUnique() {
        return Repository.get(`${resource}` + '/readunique');
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem)
    }
}
