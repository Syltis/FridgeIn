import Repository from './Repository';

const resource = '/stockitem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem)
    }
}
