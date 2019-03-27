import Repository from './Repository';

const resource = '/fooditem';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    readById(id) {
        return Repository.get(`${resource}` + '/readbyid?id=' + id)
    },
    post(fooditem) {
        return Repository.post(`${resource}` + '/post', fooditem);
    }


}