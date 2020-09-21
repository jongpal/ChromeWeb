const API = "er93eK8re71pkoaPxpHcf_pmLB5MXt5oQcxROH5eqDQ"; // api from unsplash


let query = "london"; // set query word for background image 
const unsUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id
=${API}`;




fetch(unsUrl).then(function(response){ //fetch the url and then make it json form
    return response.json();
}).then(function(next){
    const length = next.results.length - 1; // find out the length of results
   // console.log(next.results);
    
    const ran_number = Math.floor(Math.random()*length); //make random number to set random background image
   // console.log(ran_number);
    const pic_url = next.results[ran_number].urls.raw; //get raw picture inside of an url
    make_image(pic_url); //call make_image function
})

function handleImgLoad(){
    console.log("finish loading");
}

function make_image(url){ //as the url comes from API, make this function for the smooth appearance of bg image
    var myImage = new Image();
    myImage.addEventListener("loadend", handleImgLoad);
    myImage.src = url;
    myImage.classList.add("bgimage");
    document.body.appendChild(myImage);
}