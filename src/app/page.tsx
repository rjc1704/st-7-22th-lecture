import LogoutButton from "@/components/LogoutButton";
import TodoList from "@/components/TodoList";

export default async function Home() {
  return (
    <>
      <h1>홈 화면</h1>
      <LogoutButton />
      <TodoList />
    </>
  );
}
