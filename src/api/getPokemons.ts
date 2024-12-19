"use server";
import { Pokemon } from "@/types/pokemon.type";
import axios from "axios";

export const getPokemons = async (): Promise<Pokemon[]> => {
  const allPokemonPromises = Array.from({ length: 6 }, (_, index) => {
    const id = index + 1;
    return Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
  });

  const allPokemonResponses = await Promise.all(allPokemonPromises);

  const allPokemonData = allPokemonResponses.map(
    ([response, speciesResponse]) => {
      const koreanName = speciesResponse.data.names.find(
        (name: any) => name.language.name === "ko",
      );
      return { ...response.data, korean_name: koreanName?.name || null };
    },
  );

  return allPokemonData;
};
