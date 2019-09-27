import Repository from './repository';

const resource = '/stockitem';
export default {
    getgroupedonuser(email) {
        return Repository.get(`${resource}` + '/getgroupedonuser/' + email);
    },
    getGroupedByTypeOnUser(email) {
        return Repository.get(`${resource}` + '/getgroupedbytypeonuser/' + email);
    },
    post(stockitem) {
        return Repository.post(`${resource}` + '/post', stockitem);
    },
    delete(id, userId) {
        return Repository.delete(`${resource}` + '/del/' + id + '/' + userId);
    },
    deleteAllName(name) {
        return Repository.delete(`${resource}` + '/delallname/' + name);
    }
}
