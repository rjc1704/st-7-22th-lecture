import { SignUpStateType } from "@/types/auth.type";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, pw, nickname } = (await request.json()) as SignUpStateType;

  let { data, error } = await supabase.auth.signUp({
    email,
    password: pw,
    options: {
      data: {
        nickname,
      },
    },
  });
  if (error) {
    console.log("error message:", error.message);
  }
  // public.users 테이블에 유저 정보 추가는 트리거를 통해 처리
  // await supabase.from("users").insert({email, pw, nickname})

  return Response.json({ errorMsg: error?.message || null });
}
