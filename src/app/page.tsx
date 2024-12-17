import { Data } from "@/types/data";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/json", {
    cache: "force-cache",
  });
  const data: Data = await res.json();
  console.log("data:", data);
  return <>{data.title}</>;
}
