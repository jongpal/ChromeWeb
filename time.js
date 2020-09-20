//showing today's date informations

const time_date = document.querySelector(".time_date");
const dateSpan = time_date.querySelector(".dateSpan");
const timeSpan = time_date.querySelector(".timeSpan");

const getDate= new Date();

const date = getDate.getDate();

const adjust_day=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const day = adjust_day[getDate.getDay()];

const adjust_month=["Jan","Fab","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const month = adjust_month[getDate.getMonth()];
const year = getDate.getFullYear();
dateSpan.innerHTML=`${day} ${month} ${date} ${year}`;



function getTime(){

let getTimeData = new Date();
let second = getTimeData.getSeconds();
if(second < 10)
    second = '0'+second ;
else 
    second = second;
let minute = getTimeData.getMinutes();
if(minute < 10)
    minute = '0'+minute;
else   
    minute = minute;
let hour = getTimeData.getHours();
if(hour < 10)
    hour = `AM 0${hour}`;
else if(hour > 12)
{
    hour = '0'+hour - 12;
    hour = `PM ${hour}`;
}
else
    hour = `AM ${hour}`;

timeSpan.innerHTML = `${hour}:${minute}:${second}`;

}

setInterval(getTime,1000);


