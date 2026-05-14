const BASE_URL = "http://localhost:3000/"
const list = document.querySelector(".students-list")
const form = document.querySelector("#add-student-form")

form.addEventListener("submit", onForm)


function getStudents(params) {
    return fetch(`${BASE_URL}students`)
    .then((result) => {
        return result.json()
    })
}

getStudents()
.then((result) => renderStudents(result))

function renderStudents(students) {

    // list.innerHTML = "";

        const markup = students.map((item) => {
        return `<li data-id=${item.id}>
            <h2>${item.name}</h2>
            <p>age: ${item.age}</p>
            <p>phone: ${item.phone}</p>
      </li>`
    }).join("")


    list.insertAdjacentHTML("beforeend", markup)
}

//create

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

// delete

function deletePostById(id) {
    const options = {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(`${BASE_URL}students/${id}`, options)
      .then(response => response.json())
}

// deletePostById('Z2d8tZI')
// .then((result) => {console.log(result)})
// .catch((error) => {console.log(error);
// })

// update

const updatedStudent = {
    name : "Update student's name"
}

function updateStudentById(updatedStudent, id) {
    const options = {
        method : "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(updatedStudent)
    }
    return fetch(`${BASE_URL}students/${id}`, options)

      .then(response => response.json())
}

// updateStudentById(updatedStudent, 3)
// .then((result) => {console.log(result)})
// .catch((error) => {console.log(error);
// })


