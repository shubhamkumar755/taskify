import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({ todo }) {

    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }
    return (
        <div
            className={`flex   px-3 py-1.5 gap-x-3  duration-300  text-black 
                ${todo.completed ? "bg-[#4b7b93]" : "bg-[black] text-white"}`}>
            <input
                type="checkbox"
                className="cursor-pointer w-6 h-6 mt-1"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full  bg-transparent  ${isTodoEditable ? "bg-[pink] px-2 border-1 text-[steelblue" : "border-transparent"} 
                ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-7 h-7 my-1 rounded text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}>
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-7 h-7 my-1 rounded text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}>
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
