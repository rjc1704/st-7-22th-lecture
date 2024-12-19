import { toggleTodo } from "@/api/todo";
import { Todo } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useMutation({
    mutationFn: async (id: Todo["id"]) => {
      await toggleTodo(id, !todo.is_completed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <li
      key={todo.id}
      className={`border border-black p-3 mb-3 ${
        todo.is_completed && "line-through"
      }`}
    >
      <h3>{todo.title}</h3>
      <h3>{todo.contents}</h3>
      <button onClick={() => updateTodo(todo.id)}>
        {todo.is_completed ? "취소" : "완료"}
      </button>
    </li>
  );
}

export default TodoItem;
