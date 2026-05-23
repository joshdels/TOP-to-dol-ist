import { TodoList, ProjectList, Project, Todo } from "./objects/class.js";
import "./styles.css";

console.log("hello");

const newTodo = new Todo("Buy milk", "Im buying milk", "project");
newTodo.storeTodo();

console.log("Before delete:",(TodoList)); 

Todo.editTodo(TodoList[0].id, "Hello", "NewDescriptoin", "NewDate", "NewProject")


console.log("Edit:", (TodoList));