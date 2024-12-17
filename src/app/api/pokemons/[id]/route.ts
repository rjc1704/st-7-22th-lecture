import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );

    const koreanName = speciesResponse.data.names?.find(
      (name: any) => name.language.name === "ko",
    );

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

    const pokemonData = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    // return NextResponse.json(pokemonData);
    // 헤더 설정 추가
    return new NextResponse(JSON.stringify(pokemonData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache", // HTTP 1.0 호환성
        Expires: "0", // 캐시 만료 시간
        "Access-Control-Allow-Origin": "*", // CORS 설정 (모든 도메인 허용)
        "X-Content-Type-Options": "nosniff", // MIME 타입 스니핑 방지
      },
    });
  } catch (error) {
    // console.error("Error fetching Pokemon data:", error);
    // return NextResponse.json({ error: "Failed to fetch data" });
    console.error("Error fetching Pokemon data:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }
};
