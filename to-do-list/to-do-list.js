const input = document.querySelector(".input")
const button = document.querySelector(".button")
const Tasklist = document.querySelector(".task-list")

button.addEventListener("click", function(){
    let inputValue = input.value;
    const newTask = document.createElement("div");
    const newP = document.createElement("p");
    newP.textContent =inputValue;

    newTask.appendChild(newP);
    newTask.classList.add("task");

    if(input.value === ""){
        return;
    }
   

    const remove = document.createElement("button");

    const edit = document.createElement("button");

    const done = document.createElement("button")
    
    newTask.appendChild(remove);
    remove.textContent = "Remove";

    newTask.appendChild(edit);
    edit.textContent = "Edit";

    newTask.appendChild(done);
    done.textContent = "Done"
    
    Tasklist.appendChild(newTask);

    remove.addEventListener("click", function(){
        newTask.remove();
    })

    edit.addEventListener("click", function(){
        
        
        if(edit.textContent === "Save"){
            const newInput = newTask.querySelector(".new-input");
            newP.style.display = "block";
            console.log(newInput.value);
            newInput.style.display = "none";
            edit.textContent = "Edit";
            newP.textContent = newInput.value
            inputValue = newInput.value
        }
        else{
            const newInput = document.createElement("input");

            newInput.classList.add("new-input");
            newInput.value = inputValue;
            newTask.prepend(newInput);
            edit.textContent = "Save";
            newP.style.display = "none";
     
    }
    });
    done.addEventListener("click", function(){
    remove.textContent = "Undo"

        if(remove.textContent === "Undo"){
            newP.style.textDecoration = "line-through";
            done.style.display = "none";
            edit.style.display = "none";
            remove.textContent = "Remove"
        }
        else{
            newP.style.textDecoration = "none";
            done.style.display = "block"
            edit.style.display = "block" 
            remove.textContent = "Undo"
        }

    })
 input.value = "";
});

