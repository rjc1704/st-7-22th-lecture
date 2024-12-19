"use client";

import BackButton from "@/components/BackButton";

export default function PokemonDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            포켓몬 정보를 불러오는데 실패했습니다
          </h2>

          <p className="text-gray-600 mb-6">{error.message}</p>

          <div className="space-x-4">
            <button
              onClick={() => reset()}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-6 rounded-full transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
