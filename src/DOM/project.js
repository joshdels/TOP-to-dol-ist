import { ProjectList, Project, TodoList } from "../objects/class.js";
import { renderProjectTodo, setupNewTask } from "./todo.js";

export function renderProjects() {
  const projectContainer = document.querySelector("#projects");

  projectContainer.innerHTML = "";

  if (ProjectList.length === 0) {
    projectContainer.innerHTML = `<p>No Projects</p>`;
    return;
  }

  ProjectList.forEach((item) => {
    const project = document.createElement("div");

    project.innerHTML = `
      <button class="project-btn" data-id="${item.id}">
        ${item.name}
      </button>
    `;

    projectContainer.appendChild(project);
  });
}

export function setupNewProject() {
  const projectButton = document.querySelector("#new-project");

  if (!projectButton) return;

  projectButton.addEventListener("click", () => {
    openProjectDialog();
  });
}

function openProjectDialog() {
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
    <h2>New Project</h2>

    <input id="name" type="text" placeholder="Project Name" />

    <div>
      <button type="button" id="create-btn">Create</button>
      <button type="button" id="close-btn">Close</button>
    </div>
  `;

  document.body.appendChild(dialog);

  dialog.showModal();

  dialog.querySelector("#close-btn").addEventListener("click", () => {
    dialog.close();
    dialog.remove();
  });

  dialog.querySelector("#create-btn").addEventListener("click", () => {
    const name = dialog.querySelector("#name").value;

    const project = new Project(name);
    project.storeProject();

    dialog.close();
    dialog.remove();

    renderProjects();
  });
}

export function setupProjectDetails() {
  const projectContainer = document.querySelector("#projects");
  const content = document.querySelector("#content");

  projectContainer.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const id = e.target.dataset.id;

    const project = ProjectList.find((p) => p.id === id);

    if (!project) return;

    renderProjectDetails(project, id);

    setupNewTask(id);
  });
}
function renderProjectDetails(project, id) {
  const content = document.querySelector("#content");

  content.innerHTML = `
    <div class="project-container">
      <h1>${project.name}</h1>
      <span>${project.date}</span>
      <button id="delete-project">delete</button>
      <button id="edit-project">edit</button>
    </div>

    <button id="add-task-btn">
      Add Task
    </button>

    <div id="todo-list"></div>
  `;

  renderProjectTodo(id);
  console.log(TodoList);

  const deleteBtn = document.getElementById("delete-project");
  deleteBtn.addEventListener("click", () => {
    Project.deleteProject(id);

    renderProjects();
    renderProjectDetails(project, id);
    content.innerHTML = "";
  });

  const editBtn = document.getElementById("edit-project");
  editBtn.addEventListener("click", () => {
    openProjectEdit(id);
  });
}

function openProjectEdit(id) {
  const dialog = document.createElement("dialog");
  const project = ProjectList.find((p) => p.id === id);

  dialog.innerHTML = `
  <h2>Edit Project</h2>

  <label>Project Name</label>
  <input id="name" type="text" value="${project.name}" />
  <div>
    <button type="button" id="submit">Submit</button>
    <button type="button" id="close-btn">close</button>
  </div>
  `;

  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector("#submit").addEventListener("click", () => {
    const name = dialog.querySelector("#name").value;

    Project.editProject(id, name);

    dialog.close();
    dialog.remove();

    renderProjects();

    renderProjectDetails(project, id);
    setupNewTask(id);
  });

  dialog.querySelector("#close-btn").addEventListener("click", () => {
    dialog.close();
    dialog.remove();
  });
}
