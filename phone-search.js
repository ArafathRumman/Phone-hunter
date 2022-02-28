document.getElementById('searchBtn').addEventListener('click',function(){
    inputFieldValue = getValue()
    // Get api value 
    fetch('https://openapi.programming-hero.com/api/phones')
    .then(res => res.json())
    .then(data => apiDataExtract(data.data))

    
})

function apiDataExtract(data){
    
    const cardDiv = document.getElementById('cardDiv')
    for(data of data){
        console.log(data.phone_name)
        brand = data.brand; //mobile brand name
        phoneName = data. phone_name //mobile name
        phoneImg = data.image //mobile image
        
        const div = document.createElement('div')
        div.classList.add("col")
        div.innerHTML = `
        <div class="card">
          <img src="${phoneImg}" class="card-img-top w-75 mx-auto p-2" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phoneName}</h5>
            <p class="card-text">${brand}</p>
          </div>
        </div>
      `
      cardDiv.appendChild(div)
      

    }
    
}


function getValue(){
     const inputField = document.getElementById('inputBar')
     ipnutValue = inputField.value;
     return ipnutValue
     
    
}






