// Define o tipo de dado para uma tarefa, garantindo consistência
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

// Nosso "banco de dados" em memória.
// Em um projeto real, isso seria um banco de dados de verdade, como PostgreSQL ou MongoDB.
// Por ser uma `const`, os dados persistem enquanto o servidor estiver rodando.
export const todos: Todo[] = [
  { id: "1", task: "Aprender Next.js", completed: true },
  { id: "2", task: "Entender Server Actions", completed: false },
  { id: "3", task: "Construir a To-Do List", completed: false },
];
