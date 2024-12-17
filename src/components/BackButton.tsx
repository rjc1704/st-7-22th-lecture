"use client";
import { revalidate } from "@/api/revalidate";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-blue-300 rounded-md p-1 cursor-pointer"
      onClick={() => {
        revalidate({ type: "path", path: "/detail", kind: "page" });
        router.back();
      }}
    >
      뒤로가기
    </button>
  );
}
