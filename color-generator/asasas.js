const NOOB = document.getElementById("player11")
const button = document.getElementById("button")
const div = document.getElementById("player11")



button.addEventListener("click", function(){
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    div.style.backgroundColor = `rgb(${r},${g},${b})`; 

}); 