import Repository from './repository';

const resource = 'user/';
export default {
    postNewUser(user) {
        return Repository.post(`${resource}`, user);
    }
}