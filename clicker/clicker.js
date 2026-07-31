let count = 0;

const button1 = document.getElementById("clicker1")
const button2 = document.getElementById("clicker2")
const button3 = document.getElementById("clicker3")
const number = document.getElementById("number")

button1.addEventListener("click", function(){
    count = count + 1;
    number.textContent = count;
})

button2.addEventListener("click", function(){
    count = 0;
    number.textContent = count;
})

button3.addEventListener("click", function(){
    count = count - 1;
    number.textContent = count;
})

