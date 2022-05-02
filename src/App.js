import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ImBin } from "react-icons/im";
import { MdOutlineDone } from "react-icons/md";

// Packages
import { v4 as uuidv4 } from "uuid";

//  Styles
import "./App.css";

/*
  0. Import the necessary packages and/or hooks
  1. Create the input and button Elements
  2. Create the useStates
  3. Send the input value to the single todo (onchange)
  4. Send the todo to the todos (onsubmit)
  5. Create a div with all the Todos
  6. Using the map function we map through the todo

*/

const Container = styled.div`
  background-color: lightblue;
  height: 100vh; ;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowwrap;

  > h1 {
    font-size: 50px;
    margin-bottom: 3rem;
  }

  > input {
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;

    > input[type="text"]:focus {
      border: 3px solid #555;
      background-color: lightblue;
    }
  }
  > button {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;
const Todos = styled.div`
  border: 2px solid #555;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;

   > div{
    > button {
    margin-left: 10px;
    margin right: 10px;
  }
   }
`;

const App = () => {
  // Create Single Value
  // TEXT ONLY
  const [todo, setTodo] = useState("");
  function editTodo(e) {
    setTodo(e.target.value);
  }

  // Add todo to All Todos
  const [todos, setTodos] = useState([]);

  // Get Items from local storage
  function getItemsFromLS() {
    let getItems = JSON.parse(localStorage.getItem("items")); // JSON.parse()

    // 1. with if/else
    // if(getItems) {         // if getItems has a value that is not null or undefined
    //   setTodos(getItems)
    // } else {
    //   setTodos([])
    // }

    // 2. With Ternary
    getItems ? setTodos(getItems) : setTodos([]);
  }

  // on mount, get the localStorage Items
  // empty dependency means it runs only once
  useEffect(() => {
    getItemsFromLS();
  }, []);

  // Function to save the info into localStorage
  const saveInfo = (newTodos) => {
    localStorage.setItem("items", JSON.stringify(newTodos));
  };
  

  function onSubmit(e) {
    console.log(todo);
    // condition to stop empty strings going thorugh
    if (todo.length === 0) return;

    // example todo {_id:"", todotext:""}
    let newTodo = { _id: uuidv4(), todotext: todo };
    console.log(newTodo);
    todos.push(newTodo);
    setTodos(todos);
    setTodo("");
    saveInfo(todos);
  };
  
  function deleteTodo(id) {
    // 1. get the id for this todo
    // 2. go through allTodos and select by _id
    // 3. delete that todo from
    let newTodos = todos.filter((todo) => {
      if (todo._id !== id) return todo;
    });
    console.log(newTodos);
    // 4. update todos in app and localStorage
    setTodos(newTodos);
    saveInfo(newTodos);
  };

  // Delete all todos from todos and localStorage
  const deleteAllTodos = () => {
    localStorage.removeItem("items");
    setTodos([]);
  };

  return (
    <Container>
      <InnerContainer>
        <h1>To Do List</h1>

        <input
          type="text"
          name="todotext"
          id="todotext"
          placeholder="please insert task"
          value={todo}
          onChange={(e) => editTodo(e)}
          
          
        ></input>

        <button onClick={() => onSubmit()}>Submit</button>

        <div>
          {todos.length > 0
            ? todos.map((todo, index) => {
                return (
                  <Todos>
                    <div key={index}>
                      {todo.todotext}
                      <button>
                        <MdOutlineDone />
                      </button>
                      <button onClick={() => deleteTodo(todo._id)}>
                        <ImBin />
                      </button>
                    </div>
                  </Todos>
                );
              })
            : "No todos"}
        </div>

        {/* Conditional rendering, when the todos length is > 0 */}
        {todos.length > 0 ? (
          <button onClick={() => deleteAllTodos()}>Clear All Todos</button>
        ) : (
          ""
        )}
      </InnerContainer>
    </Container>
  );
};

export default App;
