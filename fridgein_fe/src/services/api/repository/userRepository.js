import Repository from './repository';

const resource = '/user';
export default {
    readAll() {
        return Repository.get(`${resource}` + '/readall');
    },
    post(user) {
        return Repository.post(`${resource}` + '/post', user);
    },
    postNewUser(user) {
        return Repository.post(`${resource}` + '/postnewuser', user);
    }
}