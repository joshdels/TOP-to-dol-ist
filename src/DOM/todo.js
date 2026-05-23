import { Todo, TodoList, ProjectList } from "../objects/class.js";

export function setupNewTask(id) {
  const taskButton = document.querySelector("#add-task-btn");

  if (!taskButton) return;

  taskButton.addEventListener("click", () => {
    openTaskDialog(id);
  });
}

function openTaskDialog(id) {
  const availableProjectsList = ProjectList.map(
    (project) => `
      <option value="${project.id}">
        ${project.name}
      </option>
    `,
  ).join("");

  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <h2>New Task</h2>

    <label for="name">Task Name</label>
    <input id="name" type="text" placeholder="Cleaning" />

    <label for="description">Description</label>
    <input id="description" type="text" placeholder="Description" />

    <label for="name">Project</label>
    <select id="projectName">
      ${availableProjectsList}
    </select>

    <div>
      <button type="button" id="add-btn">Add</button>
      <button type="button" id="close-btn">Close</button>
    </div>
  `;

  document.body.appendChild(dialog);

  dialog.showModal();

  dialog.querySelector("#close-btn").addEventListener("click", () => {
    dialog.close();
    dialog.remove();
  });

  dialog.querySelector("#add-btn").addEventListener("click", () => {
    const name = dialog.querySelector("#name").value;
    const description = dialog.querySelector("#description").value;
    const projectName = dialog.querySelector("#projectName").value;
    const projectId = id;

    const newTask = new Todo(name, description, projectName, projectId);
    newTask.storeTodo();

    console.log(TodoList);

    dialog.close();
    dialog.remove();

    renderProjectTodo(id);
  });
}

export function renderProjectTodo(id) {
  const todoContainer = document.getElementById("todo-list");

  if (!todoContainer) return;

  todoContainer.innerHTML = "";

  const filterTodo = TodoList.filter((todo) => todo.projectId === id);
  filterTodo.forEach((item) => {
    const task = document.createElement("div");

    task.innerHTML = `
    <button data-id="${item.id}">
      ${item.name}
    </button>
    `;

    todoContainer.appendChild(task);
  });
}
