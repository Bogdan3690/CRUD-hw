const BASE_URL = "http://localhost:3000/"
const list = document.querySelector(".students-list")
const form = document.querySelector("#add-student-form")


function getStudents(params) {
    return fetch(`${BASE_URL}students`)
    .then((result) => {
        return result.json()
    })
}

getStudents()
.then((result) => renderStudents(result))

function renderStudents(students) {
        const markup = students.map((item) => {
        return `<li data-id=${item.id}>
            <h2>${item.name}</h2>
            <p>age: ${item.age}</p>
            <p>phone: ${item.phone}</p>
      </li>`
    }).join("")


    list.insertAdjacentHTML("beforeend", markup)
}

function createStudent(student) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    };

    return fetch(`${BASE_URL}students`, options)
        .then(response => response.json());
}

form.addEventListener("submit", onForm)

function onForm(ev) {
    ev.preventDefault()
    console.log(ev.target.elements);
    const form = ev.target

    const {name, age, phone} = form.elements

    const newStudent = {
        name: name.value,
        age: age.value,
        phone: phone.value
    }
    console.log(newStudent);
    
createStudent(newStudent)
    .then((result) => {
        renderStudents([result]);
        form.reset();
    })
    .catch((error) => console.log(error));
}
