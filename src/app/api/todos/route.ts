import { Todo } from "@/types/todo.type";
import { createClient } from "@/utils/supabase/server";
import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase.from("todos").select("*");

  return Response.json({ data });
}

export async function PATCH(request: Request) {
  const supabase = createClient();
  const { id, completed } = (await request.json()) as {
    id: Todo["id"];
    completed: Todo["isCompleted"];
  };
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("todos")
    .update({ isCompleted: completed })
    .eq("id", id)
    .select();

  return Response.json({ data });
}
