// Importa o componente cliente que exibirá a lista.
import TodoList from "./_components/TodoList";
import { getTodos } from "./actions";
// Este componente é um Server Component, indicado pela ausência de `"use client"`.
// Ele é assíncrono porque precisa esperar a busca de dados terminar.
export default async function HomePage() {
  // A busca dos dados acontece aqui, no servidor.
  const initialTodos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Minha To-Do List
      </h1>
      {/* Passa a lista inicial para o componente cliente `TodoList` */}
      <TodoList initialTodos={initialTodos.todos} />
    </main>
  );
}
