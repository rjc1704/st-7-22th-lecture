"use server";

import axios from "axios";

type PokemonData = {
  korean_name: string;
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
  [key: string]: any;
};

export const getPokemonData = async (id: string): Promise<PokemonData> => {
  // 기본 포켓몬 데이터 요청
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  );

  // 한국어 이름 추출
  const koreanName = speciesResponse.data.names?.find(
    (name: { language: { name: string } }) => name.language.name === "ko",
  )?.name;

  // 타입 데이터 처리
  const typesWithKoreanNames = await Promise.all(
    response.data.types.map(async (type: any) => {
      const typeResponse = await axios.get(type.type.url);
      const koreanTypeName =
        typeResponse.data.names?.find(
          (name: any) => name.language.name === "ko",
        )?.name || type.type.name;
      return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
    }),
  );

  // 능력 데이터 처리
  const abilitiesWithKoreanNames = await Promise.all(
    response.data.abilities.map(async (ability: any) => {
      const abilityResponse = await axios.get(ability.ability.url);
      const koreanAbilityName =
        abilityResponse.data.names?.find(
          (name: any) => name.language.name === "ko",
        )?.name || ability.ability.name;
      return {
        ...ability,
        ability: { ...ability.ability, korean_name: koreanAbilityName },
      };
    }),
  );

  // 기술 데이터 처리
  const movesWithKoreanNames = await Promise.all(
    response.data.moves.map(async (move: any) => {
      const moveResponse = await axios.get(move.move.url);
      const koreanMoveName =
        moveResponse.data.names?.find(
          (name: any) => name.language.name === "ko",
        )?.name || move.move.name;
      return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
    }),
  );

  // 최종 데이터 반환
  return {
    ...response.data,
    korean_name: koreanName || response.data.name,
    types: typesWithKoreanNames,
    abilities: abilitiesWithKoreanNames,
    moves: movesWithKoreanNames,
  };
};
