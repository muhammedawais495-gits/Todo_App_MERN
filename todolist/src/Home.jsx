import React, {  useState } from "react";
import Create from "./Create";
import { useEffect } from "react";
import { getTodos } from "./Api/Api.js";
import { deleteTodo } from "./Api/Api.js";
import Editmodel from "./Editmodel.jsx";
import {showAlert} from "./Editmodel.jsx"

export default function Home(props) {
  const [todos, setTodos] = useState([]);

  //delete a todo from db
  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      await gettingTodos();
    } catch (error) {
      console.error("failed to delete todo:", error);
    }
  };
  // /handle edit funstion

  

  //getting todos for useeffect to disply when app refreshes
  async function gettingTodos() {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("failed to fatch todos from backend");
    }
  }
  useEffect(() => {
    gettingTodos();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo List
        </h2>

        <Create onTodoAdded={gettingTodos} />

        <div className="mt-6 space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <h2 className="text-gray-500 text-lg">No records found</h2>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo._id}
                className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800">{todo.text}</p>

                {/* display time  */}
                <p className="text-sm mt-2 text-gray-500">
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleString()
                    : "Date not available"}
                </p>

                {/* // update completed status */}
                <button onClick={showAlert}  className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 border border-blue-700 rounded">
                  
                  Edit</button>

                {/* delete button */}
                <button   class="m-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button> 
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
