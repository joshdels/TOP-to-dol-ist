import { format } from "date-fns";

export let ProjectList = [];
export let TodoList = [];

export class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.date = format(new Date(), "MMM d, yyyy");
  }

  storeProject() {
    ProjectList.push(this);
  }

  static editProject(id, newName) {
    const index = ProjectList.findIndex((p) => p.id === id);
    if (ProjectList[index]) {
      ProjectList[index].name = newName;
    }
  }

  static deleteProject(id) {
    const index = ProjectList.findIndex((p) => p.id === id);
    if (index !== -1) {
      ProjectList.splice(index, 1);
    }

    TodoList = TodoList.filter((todo) => {
      return todo.projectId !== id;
    });
  }
}

export class Todo {
  constructor(name, description, projectName, projectId) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.date = format(new Date(), "MMM d, yyyy");
    this.description = description;
    this.projectName = projectName;
    this.projectId = projectId;
  }

  storeTodo() {
    TodoList.push(this);
  }

  static editTodo(id, newName, newDescription, newDate, newProject) {
    const index = TodoList.findIndex((p) => p.id === id);
    const todoItem = TodoList[index];
    if (todoItem) {
      todoItem.name = newName;
      todoItem.date = newDate;
      todoItem.description = newDescription;
      todoItem.project = newProject;
    }
  }

  static deleteTodo(id) {
    const index = TodoList.findIndex((p) => p.id === id);
    if (index !== -1) {
      TodoList.splice(index, 1);
    }
  }
}
