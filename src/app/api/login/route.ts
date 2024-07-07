import { LoginStateType, SignUpStateType } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, pw } = (await request.json()) as LoginStateType;
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pw,
  });
  if (error) {
    console.log("error message:", error.message);
  }

  return Response.json({ errorMsg: error?.message });
}
