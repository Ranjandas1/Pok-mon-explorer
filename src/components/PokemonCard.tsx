import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { PokemonWithDetails } from "../types/pokemon";
import {
  getPokemonTypeColor,
  getTextColorForType,
} from "../services/pokemonService";
import { useFavorites } from "../contexts/FavoritesContext";

interface PokemonCardProps {
  pokemon: PokemonWithDetails;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const formattedId = `#${pokemon.id.toString().padStart(3, "0")}`;
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="block bg-yellow-100 rounded-lg overflow-hidden hover:shadow-xl shadow-yellow-200"
    >
      <div className="relative p-4 flex justify-center">
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 left-2 p-2 rounded-full ${
            isFavorite(pokemon.id) ? "text-red-500" : "text-gray-400"
          } hover:scale-110 transition-transform z-10`}
        >
          <Heart
            className={`h-6 w-6 ${
              isFavorite(pokemon.id) ? "fill-current" : ""
            }`}
          />
        </button>
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
    </Link>
  );
}

export default PokemonCard;
