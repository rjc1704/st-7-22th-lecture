import { Data } from "@/types/data";

export const GET = async () => {
  const data: Data = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
  ).then((res) => res.json());

  return Response.json(data);
};
