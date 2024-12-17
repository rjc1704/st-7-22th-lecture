import PokemonList from "./_components/PokemonList";

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        포켓몬 리스트
      </h1>
      <PokemonList />
    </div>
  );
}
