import { renderProjects, setupNewProject, setupProjectDetails } from "./DOM/project.js";
import { TodoList, ProjectList, Project, Todo, loadLocalData } from "./objects/class.js";
import "./styles.css";

loadLocalData();

renderProjects();
setupNewProject();
setupProjectDetails();

