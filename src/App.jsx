import { useEffect, useState } from 'react'
import { Todoprovider } from './contexts'
import { TodoItem } from './components'
import {TodoForm } from './components'

import {motion} from "framer-motion"

function App() {

  const [todos, setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}]) //we are just pushing new todo into the previous todos
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=> prev.map((prevTodo=>(prevTodo.id===id?todo:prevTodo))))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
  }

  // Load data on page load (component mount)
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) //Converts a JSON string into a JavaScript object
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  // Save data whenever todos change
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos)) //stringify: converts a JavaScript object into a JSON-formatted string.
  },[todos])
  // localStorage can only store strings thats why we are converting todos(array) to JSON string.

  return (
    <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-black main min-h-screen py-8">
      <div className=" max-w-2xl mx-auto   px-4 py-3 text-white">
        <motion.h1 drag className="text-4xl font-bold text-center mt-2">TASKIFY</motion.h1>
        <h1 className="text-3xl  text-center mb-8 mt-2 font-thin ">Your chaos. Organized.</h1>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm/>
        </div>
        <div className=" mb-2">Tasks: </div>
        <div className="flex flex-wrap gap-y-3 mb-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo)=>(
            <div key={todo.id} className='w-full'> {/*The key prop helps React identify which items have changed, are added, or are removed. This allows React to efficiently re-render only the items that need updates, instead of re-rendering the entire list.*/}
              <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
      <a href="https://www.linkedin.com/in/shubham-kumar-142a13278/" target='#' className="text-white fixed right-5 bottom-2 hover:text-blue-400 hover:translate-x-1 duration-150">-by shubhamKumar</a>
    </Todoprovider>
  )
}

export default App
