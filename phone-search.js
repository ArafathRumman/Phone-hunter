//  Error Message Functon 
 const ErrorMessage = (parameter) =>{
    const error =document.getElementById('errorDiv')
     if(parameter == 'true'){
          error.innerHTML =`<p class ="fs-4 text-danger text-center" >No Result Found </p>`
          appendChild(error)
          console.log('No Result ')

     }else{
        error.innerHTML =`<p class ="fs-4 text-danger text-center" >
        Please Write SomeThing </p>`
        appendChild(error);
        console.log('Please Write')
     }

 }
 
 const getValue = ()=> {
    const inputField = document.getElementById('inputBar')
    ipnutValue = inputField.value;
    inputField.value = '';
    return ipnutValue
    
   
}

document.getElementById('searchBtn').addEventListener('click',function(){
    inputFieldValue = getValue()
    if(inputFieldValue === ''){
        cardDiv.innerHTML = "";
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
        cardDiv.innerHTML = "";
        ErrorMessage('true')
    }else{
        const cardDiv = document.getElementById('cardDiv')
        const error =document.getElementById('errorDiv')
        error.innerHTML="";
        cardDiv.innerHTML = "";
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
        </div>
      `
      cardDiv.appendChild(div)
      

    }

    }
        
}









