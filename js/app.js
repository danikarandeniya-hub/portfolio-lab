const form = document.querySelector("#todo-form");
const input = document.querySelector("#task");
const list = document.querySelector("#todo-list");
const countText = document.querySelector("#task-count");
const skillsList = document.querySelector("#skills ul");

// Stretch Goal 2: Count remaining tasks
function updateCount() {
  const remaining = document.querySelectorAll("#todo-list li:not(.done)").length;
  countText.textContent = `Remaining tasks: ${remaining}`;
}

// Stretch Goal 4: Save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text, isDone = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (isDone) li.classList.add("done");

  // First event listener: toggle done class on click
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateCount();
    saveTasks();
  });

  // Stretch Goal 1: Delete button with a second event listener
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateCount();
    saveTasks();
  });

  li.append(deleteBtn);
  list.append(li);
  updateCount();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addTask(text);
  saveTasks();
  form.reset();
});

// Stretch Goal 4: Load saved tasks on page refresh
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.done));
updateCount();

// Stretch Goal 3: Fetch users and list their names in the Skills section
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      skillsList.append(li);
    });
  });
  