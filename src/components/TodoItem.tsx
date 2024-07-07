import { Todo } from "@/types/todo.type";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();
  const toggleTodo = async (id: Todo["id"]) => {
    const {
      data: [todoData],
    } = (await fetch("/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed: !todo.isCompleted }),
    }).then((res) => res.json())) as { data: [Todo] };
    queryClient.setQueryData(["todos"], (prevTodos: Todo[]) =>
      prevTodos.map((todo) => (todo.id === id ? todoData : todo)),
    );
  };
  return (
    <li
      key={todo.id}
      className={`border border-black p-3 mb-3 ${
        todo.isCompleted && "line-through"
      }`}
    >
      <h3>{todo.title}</h3>
      <h3>{todo.contents}</h3>
      <button onClick={() => toggleTodo(todo.id)}>
        {todo.isCompleted ? "취소" : "완료"}
      </button>
    </li>
  );
}

export default TodoItem;
