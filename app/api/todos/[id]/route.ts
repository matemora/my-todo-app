const todos = [
    { id: 1, title: "Estudar Next", completed: true },
    { id: 2, title: "Estudar typescript", completed: false },
    { id: 3, title: "Descansar", completed: false },
];

interface DeleteTodoParams {
    params: {
        id: string;
    }
}

export async function DELETE(
    request: Request,
    {params}: DeleteTodoParams,
) {
    const todoId = parseInt(params.id);

    console.log(todos.filter(todo => todo.id !== todoId));
    return Response.json({message: "OK"});
}