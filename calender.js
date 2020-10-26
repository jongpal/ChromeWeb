const timeSpan = document.querySelector(".timeSpan");


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

if(timeSpan.innerHTML==="PM 5:03:30"){
    const userName = localStorage.getItem("name");
    const calParsed = JSON.parse(localStorage.getItem(`${userName}'s todolist`));
    const calDate = new Date();
    const calNewDate = calDate.getDate();
    const writeDate  = document.getElementById(`day${calNewDate}`);
    writeDate.innerText = calParsed;
};

