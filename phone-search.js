//  Error Message Functon 
 const ErrorMessage = (parameter) =>{
    const error =document.getElementById('errorDiv')
     if(parameter == 'true'){
          error.innerHTML =`<p class ="fs-4 text-danger text-center" >No Result Found </p>`

     }else{
        error.innerHTML =`<p class ="fs-4 text-danger text-center" >
        Please Write SomeThing </p>`
        
     }

 }


 //Input value Function
 const getValue = ()=> {
    const inputField = document.getElementById('inputBar')
    ipnutValue = inputField.value;
    inputField.value = '';
    return ipnutValue
    
   
}

// Search Button Function

document.getElementById('searchBtn').addEventListener('click',function(){
    inputFieldValue = getValue()
    if(inputFieldValue === ''){
        cardDiv.innerHTML = ""; //clean search Result
        ErrorMessage('false')
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => searchData(data.data))
    }
})

const searchData = (data) => {
    if(data.length == 0){
        cardDiv.innerHTML = ""; //clean search Result
        ErrorMessage('true')
    }else{
        const cardDiv = document.getElementById('cardDiv')
        const error =document.getElementById('errorDiv')
        error.innerHTML="";//clean Error Message
        cardDiv.innerHTML = "";//clean search Result
        for(data of data){
            brand = data.brand; //mobile brand name
            phoneName = data.phone_name //mobile name
            phoneImg = data.image //mobile image
            mobileId= data.slug //mobile Id
            
        
        const div = document.createElement('div')
        div.classList.add("col")
        div.innerHTML = `
        <div class="card">
          <img src="${phoneImg}" class="card-img-top w-75 mx-auto p-2">
          <div class="card-body">
            <h5 class="card-title">${phoneName}</h5>
            <p class="card-text">${brand}</p>
            
          </div>
          <button id="detailsBtn" onclick="searchDetails(${'mobileId'})" class="btn btn btn-success mx-auto px-5 py-2 rounded-0 rounded-bottom w-100 fw-bold">Details</button>
        </div>
      `
      cardDiv.appendChild(div)
      

    }

    }
        
}

//  card button function
const searchDetails = (Id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${Id}`
    fetch(url)
    .then(res => res.json())
    .then(data => getDetailsData(data.data))

    const getDetailsData = (data) =>{
        console.log(data)
        
        const showInfo = document.getElementById('showInfo')
        const newdiv = document.createElement('div')
        newdiv.innerHTML = `<div class="card mb-2">
        <img src="${phoneImg}" class="card-img-top w-75 mx-auto p-2">
        <div id ="cardBody" class="card-body">
          <h5 class="card-title">${phoneName}</h5>
          <p class="card-text">${brand}</p>
          <p>MainFeatures</p>
          <ul id ="mainFeatureUl">
          </ul>
            <p>Sensor</p>
            <ul id="sensorUl" >
          </ul>

            
            <li>${data.others.Bluetooth}</li>
            <li>${data.others.GPS}</li>
          

        </div>
      </div>`
     showInfo.appendChild(newdiv);
    //   sensors(data.mainFeatures.sensors)
      mainFeatures(data.mainFeatures)

        
        // for(const data in datas){
        //     console.log(data)
        // }
    }
    


}
//catch sensors data Function 
// const sensors = (datas)=>{
//    const ul = document.getElementById('sensorUl')
//    for(const data of datas){
//     const li = document.createElement('li')
//     li.innerHTML = `${data}`
//     ul.appendChild(li);
//     }
// }

//catch MainFeatures data function
const mainFeatures = (datas) =>{
    const ul = document.getElementById('mainFeatureUl')
    
    for(const data in datas){
        const li = document.createElement('li')
        li.innerHTML = `${data} : ${datas[data]}`
        ul.appendChild(li)

    }
}








