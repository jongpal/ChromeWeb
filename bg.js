const API = "er93eK8re71pkoaPxpHcf_pmLB5MXt5oQcxROH5eqDQ";


let query = "london";
const unsUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id
=${API}`;




fetch(unsUrl).then(function(response){
    return response.json();
}).then(function(next){
    const length = next.results.length - 1;
    console.log(next.results);
    
    const ran_number = Math.floor(Math.random()*length);
    console.log(ran_number);
    const pic_url = next.results[ran_number].urls.raw;
    make_image(pic_url);
})

function handleImgLoad(){
    console.log("finish loading");
}

function make_image(url){
    var myImage = new Image();
    myImage.addEventListener("loadend", handleImgLoad);
    myImage.src = url;
    myImage.classList.add("bgimage");
    document.body.appendChild(myImage);
}