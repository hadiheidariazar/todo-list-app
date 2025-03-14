import { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";

export default function App() {

  const [todos] = useState([])

  return (
    <div className="content w-full px-3">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-full xs:w-[450px] h-max max-h-full sm:max-h-[80vh] my-3 sm:my-10 p-5 rounded-lg shadow-2xl shadow-gray-400">
          <header className="flex justify-between items-center gap-x-2">
            <h1 className="text-4xl font-medium text-sky-600">Todo List</h1>
            <button className="text-2xl bg-sky-600 rounded-full p-1.5 flex justify-center items-center text-white">
              <FiSun className="hidden dark:block" />
              <FiMoon className="dark:hidden" />
            </button>
          </header>
          <form className="flex justify-between items-center gap-x-2 my-10 child:py-1.5 child:rounded-md child:border-[1px] child:border-sky-600">
            <input type="text" placeholder="Enter your task..." className="px-2 w-full focus:appearance-none focus:outline-none placeholder:text-zinc-500" />
            <button className="bg-sky-600 text-white px-4 w-max">Add</button>
          </form>
          <div className="todo-wrapper divide-y divide-gray-300 h-max max-h-96 sm:max-h-80 overflow-y-auto rounded-md">
            {todos.length ? (
              <div className="todo flex justify-between items-center gap-x-2.5 py-3 px-0.5">
                <div className="overflow-x-auto overflow-y-hidden">
                  <p className="font-medium w-max">Learn NextJs</p>
                </div>
                <div className="flex items-center gap-x-1 child:text-white child:p-2 child:rounded-full">
                  <button className="bg-sky-600">
                    <FaEdit />
                  </button>
                  <button className="bg-rose-600">
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ) : <p className="font-medium text-lg">No have todos yet :|</p>}
          </div>
        </div>
      </div>
    </div>
  )
}