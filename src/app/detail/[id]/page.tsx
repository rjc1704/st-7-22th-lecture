import BackButton from "@/components/BackButton";
import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";

export default async function PokemonDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log(id, " 포켓몬디테일 페이지렌더링");
  const defaultURL = "http://localhost:3000";
  const pokemonData: Pokemon = await fetch(`${defaultURL}/api/pokemons/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className="container">
      <BackButton />
      <h1 className="title">{pokemonData.korean_name} 상세 정보</h1>

      {/* 이미지 섹션 */}
      <section className="image-section">
        <Image
          src={pokemonData.sprites.front_default}
          width={300}
          height={300}
          alt={pokemonData.korean_name}
          className="pokemon-image"
        />
      </section>

      {/* 기본 정보 섹션 */}
      <section className="info-section">
        <h2>기본 정보</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>이름:</td>
              <td>({pokemonData.korean_name})</td>
            </tr>
            <tr>
              <td>키:</td>
              <td>{pokemonData.height} m</td>
            </tr>
            <tr>
              <td>몸무게:</td>
              <td>{pokemonData.weight} kg</td>
            </tr>
            <tr>
              <td>도감 순서:</td>
              <td>{pokemonData.order}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 능력 섹션 */}
      <section className="abilities-section">
        <h2>능력</h2>
        <ul>
          {pokemonData.abilities.map((abilityInfo, index) => (
            <li key={index}>{abilityInfo.ability.korean_name}</li>
          ))}
        </ul>
      </section>

      {/* 기술 섹션 */}
      <section className="moves-section">
        <h2>기술</h2>
        <ul>
          {pokemonData.moves.slice(0, 5).map(
            (
              moveInfo,
              index, // 최대 5개만 표시
            ) => (
              <li key={index}>{moveInfo.move.korean_name}</li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}
