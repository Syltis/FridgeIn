import Repository from './Repository';

const resource = '/food';
export default {
    readAll() {
        try {
        return Repository.get(`${resource}` + '/readall');
        }
        catch(err) {
            console.log(err);
        }
    },
    readById(id) {
        return Repository.get(`${resource}` + '/readbyid?id=' + id)
    },
    post(fooditem) {
        return Repository.post(`${resource}` + '/post', fooditem);
    }


}