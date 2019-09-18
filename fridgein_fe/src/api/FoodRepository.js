import Repository from './Repository';

const resource = '/food';
export default {
    readAll() {
        try {
            return Repository.get('https://fridgein-api.azurewebsites.net/api/food/readall');
        }
        catch (err) {
            console.log(err);
        }
    },
    readById(id) {
        return Repository.get(`${resource}` + '/readbyid?id=' + id)
    },
    post(food) {
        return Repository.post('https://fridgein-api.azurewebsites.net/api/food/post', food);
    },
    deleteAllName(name) {
        return Repository.delete('https://fridgein-api.azurewebsites.net/api/food/delallname/' + name);

    }


}