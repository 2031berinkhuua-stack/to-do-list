const currentdegree = document.querySelector(".currentdegree")
const convertdegree = document.querySelector(".convertdegree")
const numbers = document.getElementById("numbers")
const button = document.querySelector(".button")
const value = document.querySelector(".value")

button.addEventListener("click", function(){
    let number = Number(numbers.value);
    if(currentdegree.value === "celsius" && convertdegree.value === "farenheit"){
        number = (number * 9) /5  + 32
         value.textContent = number


    }
    else if (currentdegree.value === "celsius" && convertdegree.value === "kelvin"){
        number = number + 273.15
        value.textContent = number
        
    }
    else if (currentdegree.value === "farenheit" && convertdegree.value === "celsius"){
        number = (number - 32) * 5/9
        value.textContent = number
    
    }
    else if(currentdegree.value === "kelvin" && convertdegree.value === "celsius"){
        number = number - 273.15
        value.textContent = number
    }
    else if(currentdegree.value === "farenheit" && convertdegree.value == "kelvin"){
        number = (number - 32) * 5/9 + 273.15
        value.textContent = number
    }
    else{
        number = (number - 273.15) * 9/5 + 32
        value.textContent = number
    }


});
