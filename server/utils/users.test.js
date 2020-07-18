const expect = require('expect');
const {
    Users
} = require('./users');
describe('Users', () => {
    it('should add new users', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Nossy',
            room: 'The Box'

        };

        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    })
});