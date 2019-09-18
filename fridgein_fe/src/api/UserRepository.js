import Repository from './Repository';

const resource = '/user';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    post(user) {
        return Repository.post('https://fridgein-api.azurewebsites.net/api/user/post', user);
    },
    postNewUser(user) {
        return Repository.post('https://fridgein-api.azurewebsites.net/api/user/postnewuser', user);
    }
}