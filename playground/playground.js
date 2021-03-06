// const ProgressBar = require('progress');
// const bar = new ProgressBar(':bar', { total: 50 });
// const timer = setInterval(() => {
//     bar.tick()
//     if (bar.complete) {
//         clearInterval(timer)
//     }
// }, 100);


// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`)
//     readline.close()
// });

// console.log(3 / 2);
// var randString = 'Let have, Sandwitch';
// randString = randString.replace(',', '|');
// console.log(randString);
// var life;
// let me = '';
// console.log(life);
const users = [{
        id: 1,
        name: 'Osifo',
        schoolId: 4453
    },

    {
        id: 2,
        name: 'Chibueze',
        schoolId: 4040
    }
];
const grades = [{
        id: 1,
        schoolId: 4453,
        grade: 60
    },

    {
        id: 2,
        schoolId: 4040,
        grade: 65
    }
];

const getGrade = (schoolId) => {
    return new Promise((resolve, reject) => {
        const grade = grades.filter((grade) => grade.schoolId === schoolId)
        if (grade) {
            resolve(grade);
        } else {
            reject(`Unable to find grade with id of ${schoolId}.`);
        }
    })
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id)
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};
getUser(2).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
});


getGrade(4040).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
});



// const getStatus = (userId) => {
//     let user;
//     return getUser(userId).then((tempUser) => {
//         user = tempUser;
//         return getGrade(user.schoolId);
//     }).then((grades) => {
//         let average = 0;
//         if (grades.length > 0) {
//             average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
//         }
//         return `${user.name} has a ${average}% in the class.`;
//         console.log(average);
//     });
// };


const getStatusAll = async(userId) => {
    const user = await getUser(userId);
    const grades = await getGrade(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class.`;
    console.log(average);
}

getStatusAll(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});