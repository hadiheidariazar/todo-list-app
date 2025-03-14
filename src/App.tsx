import { useEffect, useRef, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import toggleTheme from "./Features/toggleTheme";
import Todo from "./Types/Todo.types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos) as Todo[];
    }
    return [];
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    
    const title = inputValue.trim();

    if (title.length) {
      if (isEditing && editingTodoId) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editingTodoId ? { ...todo, title, } : todo
        );

        setTodos(updatedTodos);
        setIsEditing(false);
        setEditingTodoId(null);
      } else {
        const newTodoInfos: Todo = {
          id: crypto.randomUUID(),
          title,
        };

        setTodos((prevTodos) => [...prevTodos, newTodoInfos]);
      }

      setInputValue("")

      if (!isEditing && inputRef.current) {
        inputRef.current.focus()
      }
    }
  };

  const editTask = (todoId: string): void => {
    const todoToEdit = todos.find((todo) => todo.id === todoId) as Todo

    if (todoToEdit) {
      setIsEditing(true);
      setEditingTodoId(todoId);
      setInputValue(todoToEdit.title);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="content w-full px-3">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white dark:bg-zinc-700 w-full xs:w-[450px] h-max max-h-full sm:max-h-[80vh] my-3 sm:my-10 p-5 rounded-lg shadow-2xl shadow-gray-400 dark:shadow-zinc-900">
          <header className="flex justify-between items-center gap-x-2">
            <h1 className="text-4xl font-medium text-sky-600 dark:text-sky-500">Todo List</h1>
            <button className="text-2xl bg-sky-600 rounded-full p-2 flex justify-center items-center text-white" onClick={toggleTheme}>
              <FiSun className="hidden dark:block" />
              <FiMoon className="dark:hidden" />
            </button>
          </header>
          <form onSubmit={submitForm} className="flex justify-between items-center gap-x-2 my-10 child:py-1.5 child:rounded-md child:border-[2px] child:border-sky-600">
            <input
              type="text"
              placeholder={isEditing ? "Enter new title task..." : "Enter your task..."}
              name="title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
              className="px-2 w-full focus:appearance-none focus:outline-none placeholder:text-zinc-500 placeholder:dark:text-white/65 bg-inherit"
            />
            <button type="submit" className="bg-sky-600 text-white px-4 w-max">
              {isEditing ? "Edit" : "Add"}
            </button>
          </form>
          <div className="todo-wrapper divide-y divide-gray-300 dark:divide-white/20 h-max max-h-96 sm:max-h-80 overflow-y-auto rounded-md">
            {todos.length ? (
              todos.map(todo => (
                <div key={todo.id} className="todo flex justify-between items-center gap-x-2.5 py-3 px-0.5">
                  <div className="overflow-x-auto overflow-y-hidden">
                    <p className="font-medium w-max">{todo.title}</p>
                  </div>
                  <div className="flex items-center gap-x-1 child:text-white child:p-2 child:rounded-full">
                    <button className="bg-sky-600" onClick={() => editTask(todo.id)}>
                      <FaEdit />
                    </button>
                    <button
                      className="bg-rose-600"
                      onClick={() => {
                        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-medium text-lg text-center">No todos yet :|</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}