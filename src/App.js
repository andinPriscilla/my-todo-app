import React,{useState} from 'react';

// Packages
import {v4 as uuidv4} from 'uuid';

//  Styles
import "./App.css";


/*
  0. Import the necessary packages and/or hooks
  1. Create the input and button Elements
  2. Create the useStates
  3. Send the input value to the single todo (onchange)
  4. Send the todo to the todos (onsubmit)
  5. 

*/

const App =() => {
  // Create Single Value
  // TEXT ONLY
  const [todo,setTodo]= useState("");
  function editTodo(e) {
    setTodo(e.target.value);
  }

  // Add todo to All Todos
  const [todos,setTodos]= useState([]);
  
  function onSubmit() {
    // example todo {_id:"", todotext:""}
    todos.push({_id:uuidv4(), todotext:todo})
    console.log(todos)
  }
  console.log(todo);
  

  return (
   <> 
      <h1>To Do List</h1>
      <input type="text" name="todotext" id="todotext" placeholder="please insert task" 
        onChange={(e)=>editTodo(e)}
      >
      </input>
      <button 
        onClick={()=>onSubmit()}
      >Submit</button>
     
    </>
  
  );
}

export default App;
