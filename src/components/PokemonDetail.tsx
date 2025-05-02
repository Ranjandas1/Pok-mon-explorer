import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import {
  getPokemonTypeColor,
  getTextColorForType,
  fetchPokemonDetails,
} from "../services/pokemonService";
import { PokemonWithDetails } from "../types/pokemon";

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [showAllMoves, setShowAllMoves] = useState(false);

  useEffect(() => {
    const loadPokemonDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const pokemonData = await fetchPokemonDetails(id!);
        const formattedPokemon: PokemonWithDetails = {
          ...pokemonData,
          displayName: pokemonData.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        };

        setPokemon(formattedPokemon);
      } catch (err) {
        setError("Failed to load Pokémon details. Please try again later.");
        console.error("Error loading Pokémon details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemonDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 text-center">
        <div className="animate-spin rounded-full h-24 w-24 border-8 border-yellow-400 border-t-transparent mb-6"></div>
        <h3 className="text-2xl font-bold text-gray-700">
          Loading Pokémon Details...
        </h3>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || "Pokemon not found"}</p>
          <Link
            to="/"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  const toggleShowAllMoves = () => {
    setShowAllMoves((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to List
          </Link>
          <button
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isFavorite(pokemon.id)
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500"
            } hover:bg-opacity-80 transition-colors`}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite(pokemon.id) ? "fill-current" : ""
              }`}
            />
            {isFavorite(pokemon.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>

        <div className="bg-yellow-100 rounded-lg shadow-md overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.displayName}
              className="h-64 w-64 object-contain"
            />
            <h1 className="text-3xl font-bold mt-4">{pokemon.displayName}</h1>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`px-4 py-1 rounded-full ${getPokemonTypeColor(
                    type.name
                  )} ${getTextColorForType(type.name)} font-medium capitalize`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="bg-yellow-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="capitalize text-gray-600">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="font-semibold">{stat.base_stat}</span>
                    </div>
                    <div className="h-2 bg-yellow-400 rounded-full">
                      <div
                        className="h-full bg-yellow-600 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Abilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <div
                    key={ability.name}
                    className="bg-yellow-50 p-4 rounded-lg flex justify-between items-center"
                  >
                    <span className="capitalize">
                      {ability.name.replace("-", " ")}
                    </span>
                    {is_hidden && (
                      <span className="text-sm text-gray-500">
                        Hidden Ability
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Moves</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {(showAllMoves
                  ? pokemon.moves
                  : pokemon.moves.slice(0, 20)
                ).map(({ move }) => (
                  <div
                    key={move.name}
                    className="bg-yellow-50 p-2 rounded text-center capitalize text-sm"
                  >
                    {move.name.replace("-", " ")}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleShowAllMoves}
                  className="text-gray-600 hover:text-gray-900 bg-yellow-400 px-4 py-2 rounded-lg"
                >
                  {showAllMoves ? "Show Less" : "See More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
