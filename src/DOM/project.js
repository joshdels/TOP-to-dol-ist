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
      <button data-id="${item.id}">
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

    content.innerHTML = `
      <div>
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

    setupNewTask(id);

    const deleteBtn = document.getElementById("delete-project");
    deleteBtn.addEventListener("click", () => {
      Project.deleteProject(id);

      renderProjects();
      content.innerHTML = "";
    });

    const editBtn = document.getElementById("edit-project");
    editBtn.addEventListener("click", () => {
      console.log("edit to finish");
    });
  });
}
