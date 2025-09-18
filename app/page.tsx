import TodoList from "./_components/TodoList";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


// Essa função simula a busca dos dados iniciais da nossa API
async function getInitialTodos() {
  const response = await fetch('http://localhost:3000/api/todos');
  const result = await response.json() as Todo[];

  return result;
}
// Em uma aplicação real, você faria a chamada diretamente aqui.

export default async function HomePage() {
  const initialTodos = await getInitialTodos();

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Minhas Tarefas</h1>
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}