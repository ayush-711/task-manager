const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#tasksList');
const inputBox = document.querySelector('#inputBox');



function onPressAdd() {

  if (inputBox.value.length === 0) {
    alert("enter your task first!");
    return;
  }

  const li = document.createElement('li');
  const p = document.createElement("p");
  p.innerHTML = inputBox.value;
  li.appendChild(p)
  // li.appendChild(document.createTextNode(inputBox.value));

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Remove!";
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);

  // const editBtn = document.createElement("button");
  // editBtn.innerText = "Edit";
  // editBtn.classList.add("btn" , "editBtn");

  // li.appendChild(editBtn);

  taskList.appendChild(li);

  saveLocalTasks(inputBox.value);

  inputBox.value = '';
}

// functionality - To Remove the task.
function updateTM(e) {
  if (e.target.innerHTML === 'Remove!') {
    taskList.removeChild(e.target.parentElement);
    deleteLocalTasks(e.target.parentElement);
  }
}

// functionality - to save the tasks in Local Storage
function saveLocalTasks(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // console.log(tasks);
}

//functionality - to show the Local Storage in UI after refresh
function getLocalTasks() {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
      const li = document.createElement('li');
      const p = document.createElement("p");
      p.innerHTML = task;
      li.appendChild(p)
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove!";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

  }
}


function deleteLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let taskText = task.children[0].innerHTML;
  let taskIndex = tasks.indexOf(taskText);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(taskIndex);
  
}


document.addEventListener('DOMContentLoaded', getLocalTasks);
addBtn.addEventListener('click', onPressAdd);
taskList.addEventListener('click', updateTM)
