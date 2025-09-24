
"use client";

import { useTransition } from "react";
import { completeTodo, deleteTodo } from "@/app/actions";
import { Todo } from "@/utils/todos";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [isPending, startTransition] = useTransition();

  const completeTodoFn = () =>
    startTransition(() => {
      completeTodo(todo.id);
    });

  const deleteTodoFn = () =>
    startTransition(() => {
      deleteTodo(todo.id);
    });

  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm mb-2">
      <span
        className={`flex-1 text-gray-800 ${
          todo.completed ? "line-through" : ""
        }`}
      >
        {todo.task}
      </span>
      <div className="flex gap-2">
        <button
          // Ao clicar, chamamos `startTransition` com uma função que invoca a Server Action.
          // Isso nos permite usar o estado `isPending` para dar feedback ao usuário.
          onClick={completeTodoFn}
          // Desabilita o botão enquanto a ação está pendente para evitar cliques múltiplos.
          disabled={isPending}
          className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
            isPending
              ? "bg-gray-400"
              : todo.completed
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {/* Mostra um texto de "carregando" enquanto a ação está em andamento. */}
          {isPending ? "..." : todo.completed ? "Desfazer" : "Completar"}
        </button>
        <button
          onClick={deleteTodoFn}
          disabled={isPending}
          className={`px-3 py-1 text-sm bg-red-500 text-white rounded-full transition-colors duration-200 ${
            isPending ? "bg-gray-400" : "hover:bg-red-600"
          }`}
        >
          {isPending ? "..." : "Deletar"}
        </button>
      </div>
    </li>
  );
}
