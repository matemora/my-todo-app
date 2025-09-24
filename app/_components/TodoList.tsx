// A diretiva `"use client"` é obrigatória.
"use client";

import { useState, useRef, useActionState, useEffect } from "react";
// Importa o hook `useFormStatus` do React para ler o status do formulário.
import TodoItem from "./TodoItem";
import { Todo } from "@/utils/todos";
// Importa a Server Action para criar uma nova tarefa.
import { createTodo } from "@/app/actions";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  // `useRef` é usado para acessar o formulário e poder resetá-lo após o envio.
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createTodo, {
    ok: true,
    todos: initialTodos,
  });

  // A função `handleAddTodo` será a `action` do nosso formulário.
  // Ela recebe o `formData` automaticamente.
  const handleAddTodo = async (formData: FormData) => {
    // Chama a Server Action, que executará no servidor.
    formAction(formData);

    // Se a Server Action retornar um erro, tratamos ele aqui.
    if ("error" in state) {
      console.error(state.error);
    } else {
      // Reseta o formulário após a adição.
      formRef.current?.reset();
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* O formulário aponta para a Server Action usando a prop `action`. */}
      {/* Isso permite que o Next.js gerencie o envio dos dados diretamente para a ação do servidor. */}
      <form ref={formRef} action={handleAddTodo} className="flex gap-2 mb-1">
        <input
          type="text"
          // O `name` do input é importante. O `formData` usa este nome para extrair o valor.
          name="task"
          className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Adicionar nova tarefa..."
        />
        <button
          type="submit"
          disabled={pending} // Desabilita o botão para evitar envios duplicados.
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {pending ? "Adicionando..." : "Adicionar"}
        </button>
      </form>
      {state?.error && (
        <p className="mb-2 text-red-500 text-xs">{state?.error}</p>
      )}

      <ul className="space-y-2">
        {/* Renderiza a lista de tarefas usando o estado local */}
        {initialTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
