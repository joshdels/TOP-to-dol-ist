import { format } from "date-fns";

export let ProjectList = [];
export let TodoList = [];

export function loadLocalData() {
  const projectData = localStorage.getItem("projectData");
  const todoData = localStorage.getItem("todoData");

  if (projectData) {
    ProjectList = JSON.parse(projectData);
  }

  if (todoData) {
    TodoList = JSON.parse(todoData);
  }
}

export function saveLocalData() {
  localStorage.setItem("projectData", JSON.stringify(ProjectList));
  localStorage.setItem("todoData", JSON.stringify(TodoList));
}

export class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.date = format(new Date(), "MMM d, yyyy");
  }

  storeProject() {
    ProjectList.push(this);
    saveLocalData();
  }

  static editProject(id, newName) {
    const index = ProjectList.findIndex((p) => p.id === id);
    if (ProjectList[index]) {
      ProjectList[index].name = newName;
    }
    saveLocalData();
  }

  static deleteProject(id) {
    const index = ProjectList.findIndex((p) => p.id === id);
    if (index !== -1) {
      ProjectList.splice(index, 1);
    }

    TodoList = TodoList.filter((todo) => {
      return todo.projectId !== id;
    });

    saveLocalData();
  }
}

export class Todo {
  constructor(name, description, projectName, projectId, priority) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.date = format(new Date(), "yyyy-MM-dd");
    this.description = description;
    this.projectName = projectName;
    this.projectId = projectId;
    this.isDone = false;
    this.priority = priority;
  }

  storeTodo() {
    TodoList.push(this);
    saveLocalData();
  }

  static editTodo(
    id,
    newName,
    newDescription,
    newDate,
    newProject,
    newProjectId,
    isDone,
    priority,
  ) {
    const index = TodoList.findIndex((p) => p.id === id);
    const todoItem = TodoList[index];
    if (todoItem) {
      todoItem.name = newName;
      todoItem.date = newDate;
      todoItem.description = newDescription;
      todoItem.projectName = newProject;
      todoItem.projectId = newProjectId;
      todoItem.isDone = isDone;
      todoItem.priority = priority;
    }
    saveLocalData();
  }

  static deleteTodo(id) {
    const index = TodoList.findIndex((p) => p.id === id);
    if (index !== -1) {
      TodoList.splice(index, 1);
    }
    saveLocalData();
  }
}
