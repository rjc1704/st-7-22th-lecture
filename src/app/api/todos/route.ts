import { Todo } from "@/types/todo.type";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase.from("todos").select("*");

  return Response.json({ data });
}

export async function PATCH(request: Request) {
  const supabase = createClient();
  const { id, completed } = (await request.json()) as {
    id: Todo["id"];
    completed: Todo["is_completed"];
  };
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed: completed })
    .eq("id", id)
    .select();

  return Response.json({ data });
}
