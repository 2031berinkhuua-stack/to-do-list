const container = document.querySelector(".container")
const initialStudents = [
  {
    id: 1,
    name: "Anu",
    score: 90,
  },
  {
    id: 2,
    name: "Bat",
    score: 65,
  },
  {
    id: 3,
    name: "Saraa",
    score: 85,
  },
  {
    id: 4,
    name: "Bold",
    score: 55,
  },
  {
    id: 5,
    name: "Erdene",
    score: 75,
  },
];
const information = initialStudents.map(students => {
    const newDiv = document.createElement("div")
    newDiv.textContent = `$(students.name) : $(students.score)`

    container.appendChild(newDiv)

})