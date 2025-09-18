"use client"
// Arquivo: components/TodoItem.tsx
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
    todo: Todo
    onDelete: (id: number) => void;
}
export default function TodoItem(props: TodoItemProps) {
  return (
    <li
      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    >
      <span className="flex-1 text-gray-700">
        {props.todo.title}
      </span>
      <button
        onClick={() => props.onDelete(props.todo.id)}
        className="bg-red-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm ml-4 hover:bg-red-600 transition-colors"
      >
        X
      </button>
    </li>
  );
}