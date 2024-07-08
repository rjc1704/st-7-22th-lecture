"use client";

import { useLoginContext } from "@/context/LoginProvider";
import { FormState } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { type ChangeEventHandler, useState, FormEventHandler } from "react";

export default function LoginForm() {
  console.log("LoginForm 실행");
  const router = useRouter();
  const { login } = useLoginContext();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const initialState = {
    email: "",
    pw: "",
    nickname: "",
  };
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Supabase 로 로그인 또는 회원가입 요청 보내기
    if (isLoginMode) {
      if (!formState.email || !formState.pw) {
        return alert("이메일과 비밀번호 모두 입력해 주세요.");
      }
      const { nickname, ...loginState } = formState;
      // 로그인 요청
      const data = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginState),
      }).then((res) => res.json());
      if (data.errorMsg) {
        alert(data.errorMsg);
        return;
      }
      alert("로그인 성공");
      login();
      setFormState(initialState);

      router.replace("/");
      return;
    }

    // 회원가입 요청
    if (!formState.email || !formState.pw || !formState.nickname) {
      return alert("이메일, 비밀번호, 닉네임 모두 입력해 주세요.");
    }
    const data = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then((res) => res.json());
    if (data.errorMsg) {
      alert(data.errorMsg);
      return;
    }

    alert("회원가입 성공");
    setFormState(initialState);
    setIsLoginMode(false);
  };
  return (
    <div>
      <h1 className="text-center">{isLoginMode ? "로그인" : "회원가입"}</h1>
      <form
        onSubmit={onSubmitHandler}
        className="w-[300px] mx-auto border border-black rounded-xl p-4"
      >
        <section>
          <label htmlFor="email">email: </label>
          <input
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </section>
        <section>
          <label htmlFor="pw">pw: </label>
          <input
            id="pw"
            name="pw"
            type="password"
            value={formState.pw}
            onChange={handleInputChange}
          />
        </section>
        {!isLoginMode && (
          <section>
            <label htmlFor="nickname">nickname: </label>
            <input
              id="nickname"
              name="nickname"
              value={formState.nickname}
              onChange={handleInputChange}
            />
          </section>
        )}
        <button className="bg-slate-500 rounded-md p-1">
          {isLoginMode ? "로그인" : "회원가입"}
        </button>
        <button
          type="button"
          onClick={() => setIsLoginMode((prev) => !prev)}
          className="bg-green-500 rounded-md p-1 block"
        >
          {isLoginMode ? "회원가입으로" : "로그인으로"}
        </button>
      </form>
    </div>
  );
}
