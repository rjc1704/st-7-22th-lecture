"use client";

import { useLoginContext } from "@/context/LoginProvider";
import { PropsWithChildren } from "react";

export default function CommonLayout({ children }: PropsWithChildren) {
  const { isLogin } = useLoginContext();
  return (
    <>
      <header className="w-full bg-slate-300 h-[30px]">
        현재 로그인 상태: {isLogin ? "로그인중" : "로그아웃상태"}
      </header>
      {children}
    </>
  );
}
