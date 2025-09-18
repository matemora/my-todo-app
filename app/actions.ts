'use server'

import { revalidatePath } from "next/cache";
import { todos } from "./utils";

interface CreateTodoActionResult {
    isSuccess?: boolean;
    result?: {
        id: number;
        title: string;
        completed: boolean;
    };
    error?: Record<string, string>;
    message?: string;
}

export default async function createTodo(prevState: unknown, formData: FormData): Promise<CreateTodoActionResult> {
      try {
            const errors: Record<string, string> = {};
            const title = formData.get("title") as string;
    
            if (!title) {
                errors.title = 'Voce precisa fornecer um titulo';
                return {
                    isSuccess: false,
                    error: errors,
                    message: "Erro de validacao"
                };
            }

            if (title.length < 6) {
                errors.title = 'Seu titulo precisa ser maior';
                return {
                    isSuccess: false,
                    error: errors,
                    message: "Erro de validacao"
                };
            }
    
            const newTodo = {
                id: new Date().getTime(),
                title,
                completed: false,
            };

            await new Promise(resolve => setTimeout(resolve, 3000));

            todos.push(newTodo);
            console.log(todos);
            return {
                isSuccess: true,
                result: newTodo,
                message: "Todo criado com sucesso",
            };
        } catch (error) {
            return { 
                isSuccess: false,
                message: "Um erro inesperado aconteceu",
            }
        }
}