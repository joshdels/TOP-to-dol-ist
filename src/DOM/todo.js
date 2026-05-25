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
    <select id="project-name">
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
    const projectName = dialog.querySelector("#project-name").value;
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

    todoContainer.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const taskId = e.target.dataset.id;

      renderTodoDetails(taskId);
    });
  });
}

export function renderTodoDetails(id) {
  const content = document.querySelector("#content");

  const task = TodoList.find((item) => item.id === id);

  content.innerHTML = "";

  content.innerHTML = `
    <h1>${task.name}</h1>
    <span>${task.date}</span>
    <p>${task.description}</p>
    <p>${task.isDone}</p>

    <div>
      <button id="delete-task">delete</button>
      <button id="edit-task">edit</button>
    </div>
  `;

  const deleteBtn = document.getElementById("delete-task");
  deleteBtn.addEventListener("click", () => {
    Todo.deleteTodo(id);

    content.innerHTML = "";
  });

  const editBtn = document.getElementById("edit-task");
  editBtn.addEventListener("click", () => {
    openTaskEdit(id);
  });
}

function openTaskEdit(id) {
  const dialog = document.createElement("dialog");
  const task = TodoList.find((item) => item.id === id);
  const availableProjectsList = ProjectList.map(
    (project) => `
    <option value="${project.id}" ${project.id === task.projectId ? "selected" : ""}>
      ${project.name}
    </option>
  `,
  ).join("");

  dialog.innerHTML = `
  <h2>Edit Todo</h2>

  <label>Todo Name</label>
  <input id="name" type="text" value="${task.name}" />
  <label>Description</label>
  <input id="description" type="text" value="${task.description}" />
  <label for="project-name">Project</label>
    <select id="project-id">
      ${availableProjectsList}
    </select>
  <label>Date</label>
  <input id="date" type="date" value="${task.date}" />
  <label>Done</label>
  <input id="done" type="checkbox" ${task.isDone ? "checked" : ""} />
  <div>
    <button type="button" id="submit">Submit</button>
    <button type="button" id="close-btn">close</button>
  </div>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector("#submit").addEventListener("click", () => {
    const name = dialog.querySelector("#name").value;
    const description = dialog.querySelector("#description").value;
    const projectId = dialog.querySelector("#project-id").value;
    const date = dialog.querySelector("#date").value;
    const isDone = dialog.querySelector("#done").value;

    const project = ProjectList.find((p) => p.id === projectId)
    const projectName = project.name;

    console.log("Edit function");
    Todo.editTodo(id, name, description, date, projectName, projectId, isDone);

    dialog.close();
    dialog.remove();
    renderTodoDetails(id);
  });

  dialog.querySelector("#close-btn").addEventListener("click", () => {
    dialog.close();
    dialog.remove();
  });
}
