import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import PokemonCard from "./PokemonCard";
import { Heart } from "lucide-react";
import { PokemonWithDetails } from "../types/pokemon";

interface FavoritesListProps {
  allPokemon: PokemonWithDetails[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ allPokemon }) => {
  const { favorites } = useFavorites();

  const favoritePokemon = allPokemon.filter((p) => favorites.includes(p.id));

  if (favoritePokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Heart className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          No Favorites Yet
        </h3>
        <p className="text-gray-500 max-w-md">
          You haven't added any Pokémon to your favorites yet. Click the heart
          icon on any Pokémon card to add it to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {favoritePokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
};

export default FavoritesList;
