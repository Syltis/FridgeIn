import store from '../store/index';
import { repositoryFactory } from '../repository/repositoryFactory';

const userRepository = repositoryFactory.get('user')

export default {
    async updateUser(user) {
        await userRepository.postNewUser(user).then(result => {
            store.dispatch('app/updateUser', result.data);
        }).catch(err => {
            console.log(err);
        });
    }
}