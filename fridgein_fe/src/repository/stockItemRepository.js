import Repository from './repository';

const resource = 'stockitem/';
export default {
    getGroupedOnUser(email) {
        return Repository.get(`${resource}` + 'getgroupedonuser/' + email);
    },
    getGroupedByTypeOnUser(email) {
        return Repository.get(`${resource}` + 'getgroupedbytypeonuser/' + email);
    },
    delete(id, userId) {
        return Repository.delete(`${resource}` + id + '/' + userId);
    }
}
