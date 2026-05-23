import { ProjectList, Project } from "../objects/class.js";

export function renderProjects() {
  const sidebar = document.querySelector("aside");
  sidebar.innerHTML = "<h1>Projects</h1>";


  if (ProjectList.length === 0) {

    const project = document.createElement("span");
    project.innerHTML = `
    <h2>No Project Mate?</h2> 
    <button id="new-project">New Project</button>
    `;
    sidebar.append(project);
  }

  ProjectList.forEach((item) => {
    const newProject = document.createElement("span");
    newProject.innerHTML = `
      <button>${item.name}</button>
      `;
    sidebar.appendChild(newProject);
  });

  newProject();
}

export function newProject() {
  const projectButton = document.querySelector("#new-project");

  if (!projectButton) return;

  projectButton.addEventListener("click", () => {
    const dialog = document.createElement("dialog");

    dialog.innerHTML = `
      <h2>Create Project</h2>

      
      <input id="name" type="text" placeholder="Project Name" />

      <div>
        <button id="create-btn">Create</button>
        <button id="close-btn">Close</button>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.showModal();

    const closeBtn = dialog.querySelector("#close-btn");
    closeBtn.addEventListener("click", () => {
      dialog.close();
    });

    const createBtn = dialog.querySelector("#create-btn");

    createBtn.addEventListener("click", () => {
      const name = dialog.querySelector("#name").value;

      const projectName = new Project(name);
      projectName.storeProject();

      dialog.close();

      renderProjects();
    });
  });
}
