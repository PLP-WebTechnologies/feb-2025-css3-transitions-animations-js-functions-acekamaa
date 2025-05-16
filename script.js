const addBtn = document.getElementById("addTaskBtn");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToUI(task.text, task.status));
};

// Add new task
addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task) {
      addTaskToUI(task, "pending");
      saveTask(task, "pending");
      input.value = "";
    }
  });


function addTaskToUI(text, status) {
  const li = document.createElement("li");
  li.classList.add(status.toLowerCase());

  const span = document.createElement("span");
  span.textContent = text;

  const select = document.createElement("select");
  ["pending", "complete", "notdone"].forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.toLowerCase();
    option.text = opt;
    if (opt.toLowerCase() === status.toLowerCase()) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    li.className = select.value; // remove old status and apply new one
    updateTaskStatus(text, select.value);
  });

  li.appendChild(span);
  li.appendChild(select);
  taskList.appendChild(li);
}

// function saveTask(text, status) {
//   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.push({ text, status });
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

function saveTask(text, status) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Prevent duplicate entry
    const exists = tasks.find(task => task.text === text);
    if (!exists) {
      tasks.push({ text, status });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
  

function updateTaskStatus(text, newStatus) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === text ? { ...task, status: newStatus } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
