import {useState} from 'react'

import context from './Mycontext'

const MyProvider = ({children})=>{
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);  

    const value={
        todo,setTodo,todos,setTodos
    }

 return (
     <context.Provider value={value}>
{children}
     </context.Provider>
 )
}

export default MyProvider