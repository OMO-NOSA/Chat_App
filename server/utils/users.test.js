const expect = require('expect');
const {
    Users
} = require('./users');
describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: "1",
                name: "Michael Power",
                room: "Politics"
            },
            {
                id: "2",
                name: "John Doe",
                room: "Politics"
            },

            {
                id: "3",
                name: "Jane Doe",
                room: "Twitter Feminist"
            },
        ];

    });
    it('should add new users', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Nossy',
            room: 'The Box'

        };

        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names of users in a room', () => {
        // console.log(users);
        // console.log(users.users[0]);
        let resUsersArray = users.getUserList('Politics');
        expect(resUsersArray).toEqual([users.users[0].name, users.users[1].name]);
    });


    it("Should return names of users in room Twitter Feminists", () => {

        let resUsersArray = users.getUserList("Twitter Feminist");
        expect(resUsersArray).toEqual([users.users[2].name]);
    });

    it("should remove a user", () => {
        let userId = "2";
        let resUser = users.removeUser(userId);
        expect(resUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", () => {
        let userId = "33";
        let resUser = users.removeUser(userId);
        expect(resUser).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it("should find a user", () => {
        let userId = '2';
        let resUser = users.getUser(userId);
        // console.log(users);
        // console.log(resUser);
        expect(resUser.id).toBe(userId);
    });

    it("should not find a user", () => {
        let userId = '33';
        let resUser = users.getUser(userId);
        expect(resUser).toNotExist();
    });
    //});


});