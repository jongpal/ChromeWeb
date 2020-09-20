const freq = document.querySelector(".freq");
const siteName = document.querySelector("div.freq details input[id='siteName']");
const url = document.querySelector("div.freq details input[id='url']");
const saveResult = document.querySelector("div.freq details button.saveResult");
const hereSave = document.querySelector("div.freq div.hereSave");


let saveLists=[];


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

function handleSave(event){
    event.preventDefault();
    const sitevalue = siteName.value;
    const urlvalue = url.value;
    saveThem(sitevalue, urlvalue);

    saveInLocal(sitevalue,urlvalue);
}

function saveThem(sv,uv){
    const name_btn = document.createElement("button");
    const url_link = document.createElement("a");
    url_link.setAttribute("href", uv);
    name_btn.innerHTML=sv;
    url_link.appendChild(name_btn);
    hereSave.appendChild(url_link);
}




if(localStorage.getItem("sitelists") === (null||"[]"))
{
    
    saveResult.addEventListener("click", handleSave);
}
else{
    const parsing = JSON.parse(localStorage.getItem("sitelists"));
    if(parsing === null){
        saveResult.addEventListener("click", handleSave);
    }
    else{
    parsing.forEach(function(inLocal){
        saveThem(inLocal.sv, inLocal.uv);
    })
    saveResult.addEventListener("click", handleSave);
}
}

//웹사이트 추가
//이름 : (저장할이름) 버튼 생기고 누르면 -> button 안에 그이름 추가되는식
//URL : 버튼 안에 a태그 url로 추가 (이름을 감쌈)

//<a href="url"><button>name</button></a>
