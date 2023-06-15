console.log("JS Connected");

const form = document.querySelector("form");
const todoList = document.getElementById("todo-list");
const showErrorMsg = document.getElementById("error-msg");
const successNotification = document.getElementById("liveToast");
const clearBtn = document.getElementById("clear-btn");
document.addEventListener("DOMContentLoaded", getTodos);

showErrorMsg.style.display = "none";
let todoId = 0;
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("Todos");
  todoList.remove();
});
form.addEventListener("submit", submitHandler);
let date = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
function submitHandler() {
  // event.preventDefault();
  if (form.todo.value === "") {
    showErrorMsg.style.display = "";
    showErrorMsg.innerText = "Todo Must not be empty";
    event.stopPropagation();
  } else if (form.todo.value.length <= 4) {
    showErrorMsg.style.display = "";
    showErrorMsg.innerText = "Todo length must be greater then 4";
    event.stopPropagation();
  } else {
    showErrorMsg.style.display = "none";

    form.classList.add("was-validated");
    const todo = form.todo.value;
    todoId += 1;
    const todoObj = {
      Id: todoId,
      todo: todo,
      date: date,
      isCompleted: false,
    };
    storeTodo(todoObj);
    form.todo.value = "";
    todoList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start" id="li-${
      todoObj.Id
    }">
    ${todoObj.Id}
                      <div class="ms-2 me-auto">
                        <div class="fw-bold  ${
                          todoObj.isCompleted
                            ? "text-decoration-line-through"
                            : ""
                        }"  id="${todoObj.Id}">${todoObj.todo}</div>
                        <span class="small " id="todo-date">${
                          todoObj.date
                        }</span>
                      </div>
                      <div class="btn-group" role="group" aria-label="Basic example">
                         ${
                           todo.isCompleted
                             ? `<button type="button" class="btn btn-warning" id="complete-todo" onClick="unCompleteTodo(${todo.Id})">X</button>`
                             : `<button type="button" class="btn btn-success" id="complete-todo" onClick="completeTodo(${todo.Id})"><i class="bi bi-check-lg"></i></button>`
                         }
                        <button type="button" class="btn btn-danger" id="delete-todo" onClick="deleteTodo(${
                          todoObj.Id
                        })"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </li>
    `;
    const toast = new bootstrap.Toast(successNotification);

    toast.show();
  }
}

function storeTodo(todo) {
  let todoArray = [];
  if (localStorage.length <= 0) {
    localStorage.setItem("Todos", JSON.stringify(todoArray));
  }
  todoArray = JSON.parse(localStorage.getItem("Todos"));
  todoArray.forEach((element) => {
    if (todo.Id === element.Id) {
      todo.Id = element.Id + 1;
    }
  });
  todoArray.push(todo);
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  document.addEventListener("load", getTodos);
}

function getTodos() {
  let todos;
  if (localStorage.length <= 0) {
    console.log("There is no todo");
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
    todos.forEach((todo) => {
      todoList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start" id="li-${
      todo.Id
    }">
                    ${todo.Id}
                      <div class="ms-2 me-auto">
                        <div class="fw-bold  ${
                          todo.isCompleted ? "text-decoration-line-through" : ""
                        }"  id="${todo.Id}">${todo.todo}</div>
                        <span class="small " id="todo-date">${todo.date}</span>
                      </div>
                      <div class="btn-group" role="group" aria-label="Basic example">
                      ${
                        todo.isCompleted
                          ? `<button type="button" class="btn btn-warning" id="complete-todo" onClick="unCompleteTodo(${todo.Id})">X</button>`
                          : `<button type="button" class="btn btn-success" id="complete-todo" onClick="completeTodo(${todo.Id})"><i class="bi bi-check-lg"></i></button>`
                      }
                        
                        <button type="button" class="btn btn-danger" id="delete-todo" onClick="deleteTodo(${
                          todo.Id
                        })"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </li>
    `;
    });
  }
}

function completeTodo(todoId) {
  console.log(todoId);
  let todoArray = [];
  todoArray = JSON.parse(localStorage.getItem("Todos"));
  todoArray.forEach((todo) => {
    if (todoId === todo.Id) {
      todo.isCompleted = true;
    }
  });
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  const todo = document.getElementById(`${todoId}`);
  todo.classList.add("text-decoration-line-through");
}

function unCompleteTodo(todoId) {
  console.log(todoId);
  let todoArray = [];
  todoArray = JSON.parse(localStorage.getItem("Todos"));
  todoArray.forEach((todo) => {
    if (todoId === todo.Id) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  const todo = document.getElementById(`${todoId}`);
  todo.classList.remove("text-decoration-line-through");
}

function deleteTodo(todoId) {
  // console.log(todoId);
  let todoArray = [];
  let todoIndex;
  todoArray = JSON.parse(localStorage.getItem("Todos"));
  todoArray.forEach((todo, index) => {
    if (todoId === todo.Id) {
      todoIndex = index;
    }
  });
  todoArray.splice(todoIndex, todoIndex);
  localStorage.setItem("Todos", JSON.stringify(todoArray));
  const todo = document.getElementById(`li-${todoId}`);
  todoList.removeChild(todo);
}
// form.addEventListener('submit', removeInput);
// function removeInput(addTodo) {
//     console.log("function is working")
//     if (addTodo===submit) {
//         const todo = form.todo.value;
//         addTodo.remove(todo)
//     }
//     else{

//     }
// }
