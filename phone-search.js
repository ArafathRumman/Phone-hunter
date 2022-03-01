//  Error Message Functon start
 const ErrorMessage = (parameter) =>{
    const error = document.getElementById('errorDiv')
     if(parameter == 'true'){
          error.innerHTML =`<p class ="fs-4 text-danger text-center" >No Result Found </p>`

     }else{
        error.innerHTML =`<p class ="fs-4 text-danger text-center" >
        Please Write SomeThing </p>`
        
     }

 }
//  Error Message Functon End

//Input value Function Start
 const getValue = ()=> {
    const inputField = document.getElementById('inputBar')
    ipnutValue = inputField.value;
    inputField.value = '';
    return ipnutValue
}
// //Input value Function End

// Search Button Function Start
document.getElementById('searchBtn').addEventListener('click',function(){
    inputFieldValue = getValue()
    if(inputFieldValue === ''){
        const showInfo = document.getElementById('showInfo') 
        showInfo.innerHTML = "";
        cardDiv.innerHTML = ""; //clean search Result
        ErrorMessage('false')
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => searchData(data.data))
    }
})
// Search Button Function End

//Search Data Function start
const searchData = (data) => {
    if(data.length == 0){
        const showInfo = document.getElementById('showInfo') 
        showInfo.innerHTML = "";
        cardDiv.innerHTML = ""; //clean search Result
        ErrorMessage('true')
    }else{
        const showInfo = document.getElementById('showInfo') 
        showInfo.innerHTML="";
        const cardDiv = document.getElementById('cardDiv')
        const error = document.getElementById('errorDiv')
        error.innerHTML="";//clean Error Message
        cardDiv.innerHTML = "";//clean search Result
        for(data of data){
            brand = data.brand; //mobile brand name
            phoneName = data.phone_name //mobile name
            phoneImg = data.image //mobile image
            const div = document.createElement('div')
            div.classList.add("col")
            div.innerHTML = `
                <div class="card">
                <img src="${phoneImg}" class="card-img-top w-75 mx-auto p-2">
                <div class="card-body">
                    <h5 class="card-title">${phoneName}</h5>
                    <p class="card-text">${brand}</p>
                </div>
                    <button id="detailsBtn" onclick="cardDetailsBtn('${data.slug}')" class="btn btn btn-success mx-auto px-5 py-2 rounded-0 rounded-bottom w-100 fw-bold">Details</button>
                </div>`
            cardDiv.appendChild(div)
        }
    }
}
//Search Data Function start

//  card button function start
const cardDetailsBtn = (data) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${data}`
    fetch(url)
    .then(res => res.json())
    .then(data => getDetailsData(data.data))
    
    const getDetailsData = (data) =>{
        console.log(data)
        const showInfo = document.getElementById('showInfo') 
        showInfo.innerHTML = "";
        const newdiv = document.createElement('div')
        newdiv.classList.add("col-10","mx-auto","col-lg-6")
        newdiv.innerHTML = `
            <div class="card mb-2">
            <img src="${data.image}" class="card-img-top w-75 mx-auto p-2">
            <div id ="cardBody" class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text"><span class="fw-bold">Release Date: </span>${ res = releaseDate(data.releaseDate)} </p>
                <p class="card-text"><span class="fw-bold">Brand Name: </span>${data.brand}</p>
                <p class="fw-bold">Main Features</p>

                <ul id ="mainFeatureUl">
                </ul>
                <p class="fw-bold">Sensor</p>
                <ul id="sensorUl" >
                </ul>
            </div>
        </div>`
        showInfo.appendChild(newdiv);
        sensors(data.mainFeatures.sensors)
        mainFeatures(data.mainFeatures)
    }
}
//  card button function End
const releaseDate = (data) =>{
    console.log(data)
    if(data.length == 0){
        return "No Release date"
    }else{
        return data
    } 
}

//catch sensors data Function start
const sensors = (datas) => {
   const ul = document.getElementById('sensorUl')
   for(const data of datas){
    const li = document.createElement('li')
    li.innerHTML = `${data}`
    ul.appendChild(li);
    }
}
//catch sensors data Function End

//catch MainFeatures data function start
const mainFeatures = (datas) =>{
    const ul = document.getElementById('mainFeatureUl')
    
    for(const data in datas){
        const li = document.createElement('li')
        li.innerHTML = `${data} : ${datas[data]}`
        ul.appendChild(li)

    }
}
//catch MainFeatures data function End








