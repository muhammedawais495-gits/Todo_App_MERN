
import axios from "axios";
// Instead of every component making requests, they'll all use api.js

const baseURL = process.env.VITE_BASE_URL
// Create an axios instance with base URL
const API = axios.create({
  baseURL: baseURL ? baseURL +  "/api":   "http://localhost:3001/api"
});

// We'll write two functions:

// getTodos()
// addTodo(text)

// getting all the existing todos from mongodb
export const getTodos = () => API.get("/todos");
// adding todos 
export const createtodos = (text) => API.post("/todos" , {text : text})


// delete todo

export const deleteTodo = (id) => API.delete(`/todos/${id}`);


// update todo completed status

