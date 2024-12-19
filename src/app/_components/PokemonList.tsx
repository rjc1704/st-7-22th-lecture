import { getPokemons } from "@/api/getPokemons";
import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";

type Props = {
  count: number;
};
export default async function PokemonList({ count }: Props) {
  const pokemonList: Pokemon[] = await getPokemons(count);

  return (
    <ul className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-auto">
      {pokemonList.map((pokemon) => (
        <li
          key={pokemon.id}
          className="bg-white border rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 h-auto"
        >
          <Link prefetch={false} href={`/detail/${pokemon.id}`}>
            <div className="p-6 h-full flex flex-col items-center">
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
              <p className="text-md text-gray-500">도감번호: {pokemon.order}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
