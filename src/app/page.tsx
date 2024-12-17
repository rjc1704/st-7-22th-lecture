import { getPokemons } from "@/api/getPokemons";
import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const pokemons: Pokemon[] = await getPokemons();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        포켓몬 리스트
      </h1>
      {/* 3열 그리드로 설정 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <Link prefetch={false} href={`/detail/${pokemon.id}`}>
              <div className="p-6 flex flex-col items-center">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.korean_name} 전면이미지`}
                  width={150}
                  height={150}
                  className="mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-700 mb-1">
                  {pokemon.korean_name}
                </h2>
                <p className="text-md text-gray-500">
                  도감번호: {pokemon.order}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
