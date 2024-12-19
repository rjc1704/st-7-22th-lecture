"use server";

import { Todo } from "@/types/todo.type";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function getTodos() {
  const { data, error } = await supabase.from("todos").select("*");
  return data;
}

export async function toggleTodo(
  id: Todo["id"],
  completed: Todo["is_completed"],
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed: completed })
    .eq("id", id)
    .select();

  return data;
}
