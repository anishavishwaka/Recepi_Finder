//Functions for cross
document.getElementById('userInput').addEventListener('focus',()=>{
    document.querySelector('i.fa-solid').style.display = "block"
})
document.getElementById('userInput').addEventListener('blur',()=>{
    document.querySelector('i.fa-solid').style.display = "none"
    if(userInput.value !== ''){
        document.querySelector('i.fa-solid').style.display = "block"
    }
})

document.querySelector('.fa-solid').addEventListener('click',()=>{
    if(userInput.value !==''){
        userInput.value = ''
    }
})
//cross function end

//Variables Declaration
const recepiDetailsContent =  document.querySelector('.recepi-details-content');
const recepiContainer = document.getElementById("appendData");
const recepiCloseBtn = document.querySelector('.recepi-Close-btn');


//Main Function
 //document.getElementById("appendData").innerHTML ="<h2>Fetching Recepies...</h2>";  
document.getElementById("btn").addEventListener("click",() =>{
   let user = document.getElementById("userInput").value;
   let mealAPI = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
  );
 mealAPI.then((getData)=>{
    return getData.json();
     }).then((sendData)=>{
    console.log(sendData)
    //recepiContainer.innerHTML = "";
    sendData.meals.forEach((e,i) =>{
      
      const recepiDiv = document.createElement('div');
        recepiDiv.classList.add('recepi');
        recepiDiv.innerHTML =
       `
       <img src="${e.strMealThumb}">
       <h3>${e.strMeal}</h3>
       <p> <span>${e.strArea}</span>Dish</p>
       <p> Belongs to <span>${e.strCategory} </span></p>
       `;
        const button = document.createElement('button');
        button.textContent ="View Recepi";
        recepiDiv.appendChild(button);

        button.addEventListener('click', () =>{
            openRecepiPopup(e);
        });

        recepiContainer.appendChild(recepiDiv);
    
       //fetch ingriedents
const  fetchIngredients = (meal) => {
    let ingredentsList = "";
    for(let i=1; i<=20; i++){
       const ingredent = meal[`strIngredient${i}`];
       if(ingredent){
           const measure = meal[`strMeasure${i}`];
         ingredentsList += `<li>${measure}${ingredent}</li>`
       }

       else{
           break;
       }
    }

    return ingredentsList;
}

const openRecepiPopup = (e) => {
    recepiDetailsContent.innerHTML =`
    <h2 class="recepiName">${e.strMeal}</h2>
    <h3> Ingredents:<h3>
    <ul class"IngredientList">${fetchIngredients(e)}</ul>
 <div class="instructions">
       <h3>Instructions: </h3>
        <p>${e.strInstructions}</p>
</div>
<img src="${e.strMealThumb}">
 <a href="${e.strYoutube}">Watch Recepi</a>
    `
    
    recepiDetailsContent.parentElement.style.display ="block";

}

//Close button

recepiCloseBtn.addEventListener('click',() => {
    recepiDetailsContent.parentElement.style.display = "none";
});



    })
 }).catch((error) =>{
   //console.log("error");
   // document.querySelector('.find').style.display = 'none';
    //document.querySelector('.notfound').innerHTML = "Meal Not Found 😥";
    //document.querySelector('.try').innerHTML = "Try Something Else 😉";
    recepiContainer.innerHTML = "<h2> error in fetching recepies..</h2>";

 })
   });
