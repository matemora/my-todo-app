// A diretiva "use server" no topo do arquivo é **obrigatória**.
// Ela instrui o Next.js a tratar todas as funções neste arquivo como Server Actions,
// ou seja, código que só pode ser executado no servidor.
"use server";

// Importa nossa lista de tarefas "de banco de dados"
import { todos } from "@/utils/todos";

// Importa `revalidatePath` para forçar a atualização dos dados na página
import { revalidatePath } from "next/cache";
import { prisma } from "./lib/prisma";

export async function getTodos() {
  const todos = await prisma.todo.findMany();
  // Retorna a lista de tarefas como um JSON.
  // Essa é a única API Route que precisaremos, já que o resto será feito por Server Actions.
  const mapTodos = todos.map(t => {
    return {
      id: String(t.id),
      task: t.title,
      completed: t.completed,
    }
  });

  return {
    todos: mapTodos
  }
}

// --- Server Action para criar uma nova tarefa ---
// O `formData: FormData` é um objeto especial que o Next.js envia automaticamente
// quando a Server Action é chamada de um formulário HTML.
export async function createTodo(prev: unknown, formData: FormData) {
  // Pega o valor do input com o `name="task"` do formulário.
  const task = formData.get("task") as string;

  // Validação básica para garantir que a tarefa não está vazia.
  if (!task || task.trim() === "") {
    return { error: "Tarefa é obrigatória" };
  }

  // Cria um novo objeto de tarefa com um ID único (usando o timestamp)
  const newTodo = {
    id: Date.now().toString(),
    task,
    completed: false,
  };

  // Adiciona a nova tarefa ao nosso array de "banco de dados".
  todos.push(newTodo);

  // **Ponto chave**: `revalidatePath` diz ao Next.js para invalidar o cache da
  // rota `/` (nossa página inicial). Isso fará com que o Server Component `HomePage`
  // seja re-renderizado na próxima navegação ou no próximo request, buscando
  // os dados atualizados.
  revalidatePath("/");
  console.log(todos);
  return { ok: true, todos: todos };
}

// --- Server Action para deletar uma tarefa ---
// Esta função recebe o ID da tarefa como argumento.
export async function deleteTodo(id: string) {
  // Encontra o índice da tarefa no array com base no ID.
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return { error: "Tarefa não encontrada" };
  }

  // Remove a tarefa do array usando o índice.
  todos.splice(todoIndex, 1);

  // Revalida o cache da rota para atualizar a lista no frontend.
  revalidatePath("/");
  console.log(todos);
  return { ok: true, message: "Tarefa deletada com sucesso", todos };
}

// --- Server Action para completar/incompletar uma tarefa ---
// Esta função também recebe o ID da tarefa como argumento.
export async function completeTodo(id: string) {
  // Encontra o objeto da tarefa no array com base no ID.
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return { error: "Tarefa não encontrada" };
  }

  // Alterna o status `completed` da tarefa.
  todo.completed = !todo.completed;

  // Revalida o cache da rota para que a mudança apareça para o usuário.
  revalidatePath("/");
  console.log(todos);
  return { ok: true, todos };
}
