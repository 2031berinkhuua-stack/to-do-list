const rollBtn = document.getElementById("rollBtn")
const currentDice = document.querySelector(".current-dice")
const history = document.getElementById("history")
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let count = 0;

rollBtn.addEventListener("click",function(){
    const random = Math.floor(Math.random() * 6)
    currentDice.textContent = diceFaces[random]

    count = count + 1
    const newDiv = document.createElement("div")
    newDiv.textContent = "Roll " + count + diceFaces[random];

    history.appendChild(newDiv);
});

