class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        let user = this.users.filter((user) => user.id === id)[0]
        return user;
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room)
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users }
    // class Person {
    //     constructor(name, age) {
    //         this.name = name;
    //         this.age = age;
    //     }

//     getUserDesc() {
//         return `${this.name} ${this.age}`;
//     }
// }
// let me = new Person('Nossy', 37);