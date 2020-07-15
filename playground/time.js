const moment = require("moment");
//import * as moment from 'moment';
let date = new Date();

console.log(date.getMonth());
console.log(moment().format('MMMM Do YYYY H:mm:ss A'));
let createdAt = '1234';
console.log(moment(createdAt))