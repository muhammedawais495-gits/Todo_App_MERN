const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

// server recieves the frontend req here and 
router.post("/", async (req, res) => {
  try {
    //used this to store the todo coming from frontend/postman
    const { text } = req.body;

    // Express creates a Todo object for mongoose and front end 
    const todo = new Todo({
      text,
    });
    
    //mongoose saves it 
    await todo.save();
    // express reponse to it to the front So FE can display it , 201 is used for posting data 
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



//get api to get data from database and send it to frontend
router.get("/",async (req,res) => {
    try{
    //stores the array of all documents fron mongo and store ir in todos
    //const todos = await Todo.find().sort({ createdAt: -1 }); later i can use this to sort the newest todo at first place 
   const todos = await Todo.find().sort({ createdAt : -1 });
    // now send data to frontend , 200 is used for retireving data 
        res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
