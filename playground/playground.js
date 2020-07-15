const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', { total: 50 });
const timer = setInterval(() => {
    bar.tick()
    if (bar.complete) {
        clearInterval(timer)
    }
}, 100);


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`)
    readline.close()
})