import React, { useState } from "react";
import { getTodos } from "./Api/Api.js";
import { createtodos } from "./Api/Api";

export default function Create(props) {
  const [task, setTask] = useState("");
  const handleAdd =  async () => {
    if(!task.trim())
    {   
         return;
         
    }

    try{
       await createtodos(task);
       await props.onTodoAdded();
       setTask("");
    }
    catch(error){
        console.error("Failed to add todo:", error);
    }
  };
 

  return (
    <div className="flex gap-3">
      {/* Input field for entering task */}
      <input

      onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        type="text"
        placeholder="Enter a todo..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition duration-200"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );


}