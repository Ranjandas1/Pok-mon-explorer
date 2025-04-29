import { PokemonWithDetails } from "../types/pokemon";
import {
  getPokemonTypeColor,
  getTextColorForType,
} from "../services/pokemonService";

interface PokemonCardProps {
  pokemon: PokemonWithDetails;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className=" bg-yellow-100 rounded-lg overflow-hidden hover:shadow-xl shadow-yellow-200">
      <div className="relative p-4 flex justify-center">
        <span className="absolute top-2 right-2 text-gray-500 font-mono text-sm font-semibold">
          {formattedId}
        </span>
        <img
          src={imageUrl}
          alt={`${pokemon.displayName} sprite`}
          className="h-32 w-32 object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-center capitalize mb-2">
          {pokemon.displayName}
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`text-sm px-3 py-1 rounded-full ${getPokemonTypeColor(
                type.name
              )} ${getTextColorForType(type.name)} font-medium capitalize`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
