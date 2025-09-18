import { todos } from "@/app/utils";


export async function GET() {
    return Response.json(todos);
}

interface PostTodoRequest {
    title: string;
}

export async function POST(request: Request) {
    try {
        const { title }: PostTodoRequest = await request.json();

        if (!title) {
            return Response.json({ error: "Titulo e obrigatorio" }, { status: 400 });
        }

        const newTodo = {
            id: new Date().getTime(),
            title,
            completed: false,
        };

        todos.push(newTodo);

        console.log(todos);
        return Response.json({message: "Deu certo"}, {status: 201})
    } catch (error) {
        return Response.json({ error: "Um erro inesperado aconteceu" }, { status: 500 })
    }
}