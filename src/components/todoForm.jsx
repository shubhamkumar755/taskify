import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {

    const[todo,setTodo]=useState("")
    const {addTodo}=useTodo()

    const add=(e)=>{
        e.preventDefault()

        if(!todo) return

        addTodo({todo})
        setTodo("") // this clears the input field after adding the todo
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Tasks..."
                className="w-full border border-black/10  px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className=" px-3 py-1 bg-[black] text-white shrink-0 hover:bg-[#4b7b93] transition duration-300 ease-in-out hover:text-black">
                Add
            </button>
            
        </form>
    );
}

export default TodoForm;

