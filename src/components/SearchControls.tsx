import { Search } from "lucide-react";
import { PokemonTypeOption } from "../types/pokemon";

interface SearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  pokemonTypes: PokemonTypeOption[];
}

function SearchControls({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  pokemonTypes,
}: SearchControlsProps) {
  return (
    <div className="sticky top-20 z-10 bg-yellow-100/80 backdrop-blur-lg shadow-md rounded-lg p-4 mb-6 mt-4 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="min-w-[200px]">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {pokemonTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchControls;
