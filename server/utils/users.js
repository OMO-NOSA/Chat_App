[{
    id: '56734',
    name: 'Thirst Trappy',
    room: 'The Box'
}]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    // removeUser(id) {
    //     this.users.forEach(id) {
    //         if (this.users.user.id === id) {
    //             this.users.pop(user);
    //         }
    //     }

    //     return this.users;
    // }
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