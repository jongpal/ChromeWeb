const freq = document.querySelector(".freq");
const siteName = document.querySelector("div.freq details input[id='siteName']");
const url = document.querySelector("div.freq details input[id='url']");
const saveResult = document.querySelector("div.freq details button.saveResult");
const hereSave = document.querySelector("div.freq div.hereSave");


let saveLists=[]; //lists that would temporarily save my sitelits


function saveInLocal(sv, uv){
    const inLocal = {
        sv,       
        uv
    }
    if(localStorage.getItem("sitelists") === (null||"[]"))
    {
        saveLists.push(inLocal);
        localStorage.setItem("sitelists", JSON.stringify(saveLists));
    }
    else{
        
        const newsite = JSON.parse(localStorage.getItem("sitelists"));
        if(newsite !== null)
        {
        saveLists = newsite;
        saveLists.push(inLocal);
        localStorage.setItem("sitelists", JSON.stringify(saveLists));
        }
        else{
            saveLists.push(inLocal);
        localStorage.setItem("sitelists", JSON.stringify(saveLists));
        }
    }
    
}

function handleSave(event){  //if event occurs, save it
    event.preventDefault();
    const sitevalue = siteName.value;
    const urlvalue = url.value;
    saveThem(sitevalue, urlvalue); //save it to the HTML

    saveInLocal(sitevalue,urlvalue); //save it in localStorage
}

function saveThem(sv,uv){    //make button and link it
    const name_btn = document.createElement("button");
    const url_link = document.createElement("a");
    url_link.setAttribute("href", uv);
    name_btn.innerHTML=sv; 
    url_link.appendChild(name_btn);
    hereSave.appendChild(url_link);
}




if(localStorage.getItem("sitelists") === (null||"[]"))  //if there is no list
{
    
    saveResult.addEventListener("click", handleSave);   //add event , click to save the result
}
else{                                                   //if there are something in the list
    const parsing = JSON.parse(localStorage.getItem("sitelists")); //parse it
    if(parsing === null){                                   //for the error control.. no meaning there
        saveResult.addEventListener("click", handleSave);       //    
    }
    else{
    parsing.forEach(function(inLocal){                   // for each article from parsed list
        saveThem(inLocal.sv, inLocal.uv);                   //save each results( for the new event of adding lists to already existing list )
    })                                                      //if i don't do this , every time the new event occurs, the list will be emptied
    saveResult.addEventListener("click", handleSave);       //for the new adding event 
}
}

//웹사이트 추가
//이름 : (저장할이름) 버튼 생기고 누르면 -> button 안에 그이름 추가되는식
//URL : 버튼 안에 a태그 url로 추가 (이름을 감쌈)

//<a href="url"><button>name</button></a>
