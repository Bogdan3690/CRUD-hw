const BASE_URL = "http://localhost:3000/";
const list = document.querySelector(".students-list");
const form = document.querySelector("#add-student-form");

form.addEventListener("submit", onForm);
list.addEventListener("click", onDelete);

async function getStudents(params) {
  const response = await fetch(`${BASE_URL}students`);
  return response.json();
}

getStudents()
  .then((result) => renderStudents(result))
  .catch((error) => console.log(error));

function renderStudents(students) {
  // list.innerHTML = "";

  const markup = students
    .map((item) => {
      return `<li data-id=${item.id}>
            <h2>${item.name}</h2>
            <p>age: ${item.age}</p>
            <p>phone: ${item.phone}</p>
            <button type="button">delete</button>
      </li>`;
    })
    .join("");

  list.insertAdjacentHTML("beforeend", markup);
}

//create

async function createStudent(student) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  };
  const response = await fetch(`${BASE_URL}students`, options);
  return response.json();
}

async function onForm(ev) {
  ev.preventDefault();
  console.log(ev.target.elements);
  const form = ev.target;

  const { name, age, phone } = form.elements;

  const newStudent = {
    name: name.value,
    age: age.value,
    phone: phone.value,
  };
  console.log(newStudent);
  try {
    const result = await createStudent(newStudent);
    const students = await getStudents();
    list.innerHTML = "";
    renderStudents(result);

    form.reset();
  } catch (error) {
    console.log(error);
  }
}

// delete

async function onDelete(ev) {
  console.log(ev.target.nodeName);
  const btn = ev.target;

  if (btn.nodeName != "BUTTON") {
    return;
  }
  const parent = btn.closest("li");
  console.log(parent);
  const id = parent.dataset.id;
  console.log(id);
  try {
    const deleteStudent = await deletePostById(id)
    const students = await getStudents()
    list.innerHTML = "";
        renderStudents(students);
  } catch (error) {
    console.log(error);
  }
}

async function deletePostById(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URL}students/${id}`, options)
  return response.json()
}

// update

const updatedStudent = {
  name: "Update student's name",
};

function updateStudentById(updatedStudent, id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  };
  return fetch(`${BASE_URL}students/${id}`, options).then((response) =>
    response.json(),
  );
}

// updateStudentById(updatedStudent, 3)
// .then((result) => {console.log(result)})
// .catch((error) => {console.log(error);
// })
