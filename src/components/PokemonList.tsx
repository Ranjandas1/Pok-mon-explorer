import { PokemonWithDetails } from "../types/pokemon";
import PokemonCard from "./PokemonCard";
import { SearchX } from "lucide-react";

interface PokemonListProps {
  pokemon: PokemonWithDetails[];
  isLoading: boolean;
  error: string | null;
}

function PokemonList({ pokemon, isLoading, error }: PokemonListProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 max-w-md">
          <h3 className="text-lg font-bold mb-2">Error Loading Data</h3>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 text-center">
        <div className="animate-spin rounded-full h-24 w-24 border-8 border-yellow-400 border-t-transparent mb-6"></div>
        <h3 className="text-2xl font-bold text-gray-700">Loading Pokémon...</h3>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <SearchX className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          No Pokémon Found
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}

export default PokemonList;
