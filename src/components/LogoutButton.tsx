"use client";

import { useLoginContext } from "@/context/LoginProvider";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useLoginContext();
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    logout();
    router.replace("/login");
  };
  return <button onClick={handleLogout}>로그아웃</button>;
}
