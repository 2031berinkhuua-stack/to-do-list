const container = document.querySelector(".container")
const display = document.querySelector(".display")
const symbols = ["x", "AC", "...", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "...", 0, ".", "="];
symbols.map((element) => {
    const newBtn = document.createElement("button")
    newBtn.textContent = element;

    container.appendChild(newBtn)

    newBtn.addEventListener("click", function(){
        if(element === "AC"){
            display.textContent = ""
        }
        else if(element === "x"){
            const newString = display.textContent.slice(0, display.textContent.length - 1)
            display.textContent = newString
        }
        else if(element === "="){
            calculate();
        } else {
            display.textContent = display.textContent + element
        }
    });
 });


function calculate() {
  const values = display.textContent.match(/(\d+\.?\d*|[\+\-\*\/])/g);
  
  if (!values) return;


  for (let i = 0; i < values.length; i++) {
    if (values[i] === "*" || values[i] === "/") {
      let Result = 0;
      if (values[i] === "*") {
        Result = Number(values[i - 1]) * Number(values[i + 1]);
      } else if (values[i] === "/") {
        Result = Number(values[i - 1]) / Number(values[i + 1]);
      }
      values.splice(i - 1, 3, Result);
      i -= 2; 
    }
  }

  for (let i = 0; i < values.length; i++) {
    if (values[i] === "+" || values[i] === "-") {
      let Result = 0;
      if (values[i] === "+") {
        Result = Number(values[i - 1]) + Number(values[i + 1]);
      } else if (values[i] === "-") {
        Result = Number(values[i - 1]) - Number(values[i + 1]);
      }
      values.splice(i - 1, 3, Result);
      i -= 2;
    }
  }

 
  display.textContent = values[0];
}