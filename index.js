

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dateTime = date+' '+time;

console.log(dateTime) 

// https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript displays current time with console.log