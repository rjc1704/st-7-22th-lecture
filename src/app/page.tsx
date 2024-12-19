import { Suspense } from "react";
import PokemonList from "./_components/PokemonList";

export default async function Home() {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        포켓몬 리스트
      </h1>
      <div className="flex items-start gap-2">
        <Suspense fallback={<div>6개 로딩중...</div>}>
          <PokemonList count={6} />
        </Suspense>
        {/* <Suspense fallback={<div>200개 로딩중...</div>}>
          <PokemonList count={200} />
        </Suspense> */}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
