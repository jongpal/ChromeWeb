const weather = document.querySelector(".weather");



const API_KEY = "1b8a663b10826e2e3fcbbdca6610117e";

navigator.geolocation.getCurrentPosition(success,error);

function success(position){

 const lat = position.coords.latitude;
 const lon = position.coords.longitude;
 
 const url = `https://api.openweathermap.org/data/2.5/weather?
lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

 fetch(url).then(function(toJson)
 {
   return toJson.json();
 }).then(function(getInfo){
     const cityName = getInfo.name;
     const temperature= getInfo.main.temp;
     const span = document.createElement("span");
     const spanCity = document.createElement("span");
     span.innerHTML=`${temperature}°C`;
     spanCity.innerHTML = `${cityName}`;
     const aTag = document.createElement("a");
     
     aTag.appendChild(spanCity);
     aTag.setAttribute("href",`https://www.openstreetmap.org/edit#map=14/${lat}/${lon}`);
     aTag.setAttribute("target","_blank");
     weather.appendChild(aTag);
     weather.appendChild(span);
 });
 
}
function error(){
    alert("failed to load location information");
}






