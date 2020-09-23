const boss = document.querySelector(".boss"),
nameForm = boss.querySelector(".nameForm"),
bossText = boss.querySelector(".bossText"),
inputName = boss.querySelector("input");


//constants for todolist
const works = document.querySelector(".works"),
workToFinish = works.querySelector(".workToFinish"),
toDoBox = works.querySelector(".todolists");
inputPlan = workToFinish.querySelector("input");


let heyBoss = localStorage.getItem("name"); //


function setKeyName(bossName){    //for distinctive todolist(identify username)
    return `${bossName}'s todolist`
}


function saveName(bossName){   //save name in localstorage
    
    localStorage.setItem("name", bossName);
}

let boxName;
function handleSubmit(event){
    event.preventDefault();
    const bossName = inputName.value;
    setKeyName(bossName); //save the user's name for the distinctive todolists
    boxName = setCkName(bossName);
    saveName(bossName);
    showName(bossName);
}

function showName(bossName){
    nameForm.classList.add("hide"); //hide the name input box
    bossText.innerHTML= `Hallo, ${bossName} !`;   
    works.classList.remove("hide"); // to show todolist box rightafter 
                                    //calling name

                //from here, inspecting the 
                //probable existing lists for this user
    if(localStorage.getItem(setKeyName(bossName)))//if exists,
    {                                       //show that list
        const parsed = JSON.parse(localStorage.getItem(setKeyName(bossName)));
    parsed.forEach(function(toDo){
        showPlan(toDo.plans, toDo.id);
        workToFinish.addEventListener("submit", handlePlanSubmit);
    });
    }
} 

function askName(){
    nameForm.addEventListener("submit", handleSubmit);
}

if(localStorage.getItem("name") === null){
    askName();
}
else{  //if a name already exists in localstorage, get that name
    showName(localStorage.getItem("name"));
}




//adding to do list

let toDoList = [];


function savePlan(plans, newID, heyBoss){//heyBoss for distinctive username
    
    const toDo = {
        plans,
        id : newID //set id to easily delete the todolists
    }
    toDoList.push(toDo);
    localStorage.setItem(setKeyName(heyBoss), JSON.stringify(toDoList));
}                       //List has to be saved in string format in localstorage

function handlePlanSubmit(event){
    event.preventDefault();
    const plans = inputPlan.value;
    const newID = toDoList.length + 1; //starts from 0
    const heyBoss = localStorage.getItem("name");
    inputPlan.value=""; //to empty the input text box
    savePlan(plans,newID, heyBoss);
    showPlan(plans,newID);
    
}


function handleDelete(event){

    event.preventDefault();
    
    const li = event.target.parentNode;
    const li_id = li.id;
    console.log(li_id);
    li.remove();
    console.log(setKeyName(heyBoss));
    const newToDoList = JSON.parse(localStorage.getItem(setKeyName(heyBoss))).filter(function(toDo){
        //to make a new list without deleted objects
        return toDo.id !== parseInt(li_id);
    })

    toDoList = newToDoList;
    localStorage.setItem(setKeyName(heyBoss), JSON.stringify(toDoList));

}



function showPlan(plans,newID){
    const li = document.createElement("li");
    const del_btn = document.createElement("button");
    del_btn.innerText="❌";
    del_btn.addEventListener("click", handleDelete);
    del_btn.setAttribute("style","cursor:pointer");
    const span = document.createElement("span");
    span.innerText = plans;
    const ckBox = document.createElement("input"); 
    ckBox.setAttribute("type","checkbox");
    ckBox.setAttribute("style","cursor:pointer");
    let findName = localStorage.getItem("name");
    setCkName(findName);
    ckBox.addEventListener("change", ckBoxCheck);//if ckBox is changed  
    li.setAttribute("id", newID);
    li.appendChild(ckBox); 
    li.appendChild(span);
    li.appendChild(del_btn);
    toDoBox.appendChild(li);

}

function alreadyThere(){

    const parsed = JSON.parse(localStorage.getItem(setKeyName(heyBoss)));
    parsed.forEach(function(toDo){
        
        if(!toDoBox.querySelector("li")){ //if there already were lists, 
                                         //then show no more lists
        showPlan(toDo.plans, toDo.id);
        }
        else{}
    })
}

if(localStorage.getItem(setKeyName(heyBoss)) === null)
{
    workToFinish.addEventListener("submit", handlePlanSubmit);
}
else{
    alreadyThere();
    workToFinish.addEventListener("submit", handlePlanSubmit);
}

//to checkbox
//to remember the previous states of checkbox


let ckBoxList=[];

let findName = localStorage.getItem("name");

function setCkName(findName){
    return `${findName}s checkbox`;
}




function ckBoxCheck(event){ 
    if(event.target.checked)//if it is checked 
    {
        if(localStorage.getItem(setCkName(findName)))
        {
       const getCurrentList = JSON.parse(localStorage.getItem(setCkName(findName)));
       ckBoxList = getCurrentList;
       //ckBoxList has to be updated every single time we call the event
       //because the List is not saving the data
        }
       const ckBoxID = event.target.parentNode.id;//use li's id,which is the parent
                                                //of checkBox
       const ckbox = {
            checked : "checked",
            ckBoxID
       }
           
       ckBoxList.push(ckbox); //add the object inside the List
       event.target.setAttribute("checked", "checked");// set "checked"
       if(findName === null){
        localStorage.setItem(boxName, JSON.stringify(ckBoxList));//save the currentstate
       }
       else
        localStorage.setItem(setCkName(findName),JSON.stringify(ckBoxList));
      
    }
    else //if it is unchecked
    {
        event.target.removeAttribute("checked");//remove "checked"
        if(findName === null){
            console.log(JSON.parse(localStorage.getItem(boxName)));
            const filtered = JSON.parse(localStorage.getItem(boxName))
            .filter(function(ckbox){
        
                return event.target.parentNode.id !== ckbox.ckBoxID;
                //return the checked id
            });
            ckBoxList = filtered; //update 
            localStorage.setItem(boxName, JSON.stringify(ckBoxList));//and save
        }
        else{
        console.log(JSON.parse(localStorage.getItem(setCkName(findName))));
        const filtered = JSON.parse(localStorage.getItem(setCkName(findName)))
        .filter(function(ckbox){
    
            return event.target.parentNode.id !== ckbox.ckBoxID;
            //return the checked id
        });
        ckBoxList = filtered; //update 
        localStorage.setItem(setCkName(findName), JSON.stringify(ckBoxList));//and save
    }
    }
}


function isCkBoxChecked(){ //check if the checkbox is checked or not
                        //and memorize it in case of reload

    
    
    const parsed = JSON.parse(localStorage.getItem(setCkName(findName)));//get the list
    const filtered = parsed.filter(function(ckbox){    //update the checkbox in case of todolists be deleted or something
        return document.getElementById(ckbox.ckBoxID) !== null;  
    })
    
    filtered.forEach(function(ckbox){
        console.log(document.getElementById('3'));
        const sltdList = document.getElementById(ckbox.ckBoxID);//get the ID inside of HTML
        
        
        const sltdInput = sltdList.querySelector("input"); //select input inside of the list with that ID
        sltdInput.setAttribute("checked", "checked");//set "checked"
        
    })
    ckBoxList=filtered;
    localStorage.setItem(setCkName(findName),JSON.stringify(ckBoxList));
       

}
if(localStorage.getItem(setCkName(findName)) && bossText.innerHTML !== "")
{
    isCkBoxChecked(); 
}
else{

}






