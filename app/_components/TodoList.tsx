'use client'
import { FormEvent, useActionState, useState } from "react";
// Arquivo: components/TodoList.tsx

// import { useState, FormEvent } from "react";
import TodoItem from "./TodoItem";
import createTodo from "../actions";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
    initialTodos: Todo[];
}

export default function TodoList(props: TodoListProps) {
    const [state, createTodoAction, loading] = useActionState(createTodo, {});
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState<Todo[]>(props.initialTodos)

    // async function handleAddTodo(event: FormEvent) {

    //     // event.preventDefault();

    //     // const response = await fetch('/api/todos', {
    //     //     method: "POST",
    //     //     body: JSON.stringify({title})
    //     // });
    //     // if(response.ok) {
          
    //     //     setTodos([...todos, {
    //     //         id: new Date().getTime(),
    //     //         title,
    //     //         completed: false,
    //     //     }])
    //     // }


    //     // setTitle('');
    // }

  return (
    <div>
      <form className="flex gap-2 mb-2" action={createTodoAction}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que precisa ser feito?"
          name="title"
          className={`flex-1 p-3 border ${state.isSuccess === false ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </form>

      {state?.error?.title && <p className="text-xs text-red-400 m-0 p-0">{state?.error?.title}</p>}

      <ul className="bg-white rounded-lg shadow-md mt-4 divide-y divide-gray-200">
        {todos.map(todo => 
            <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={(id: number) => {return;}}
            />
        )}
      </ul>
    </div>
  );
}