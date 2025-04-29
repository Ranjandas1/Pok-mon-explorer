import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchControls from "./components/SearchControls";
import PokemonList from "./components/PokemonList";
import { Pokemon, PokemonWithDetails } from "./types/pokemon";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  getAllPokemonTypes,
} from "./services/pokemonService";

function App() {
  const [allPokemon, setAllPokemon] = useState<PokemonWithDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonWithDetails[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const pokemonTypes = getAllPokemonTypes();

  // Fetch all Pokemon data
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch the list of Pokemon
        const listResponse = await fetchPokemonList(150);

        const pokemonDetailsPromises = listResponse.results.map((pokemon) =>
          fetchPokemonDetails(pokemon.name)
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        const formattedPokemon: PokemonWithDetails[] = pokemonDetails.map(
          (pokemon: Pokemon) => ({
            ...pokemon,
            displayName: pokemon.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
          })
        );

        setAllPokemon(formattedPokemon);
        setFilteredPokemon(formattedPokemon);
      } catch (err) {
        setError(
          "Failed to load Pokémon data. Please check your connection and try again."
        );
        console.error("Error loading Pokémon:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, []);

  // Filter Pokemon based on selected type
  useEffect(() => {
    const filterPokemon = () => {
      let filtered = [...allPokemon];
      if (searchTerm.trim() !== "") {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(searchTermLower) ||
            pokemon.id.toString() === searchTermLower.replace("#", "")
        );
      }
      if (selectedType !== "") {
        filtered = filtered.filter((pokemon) =>
          pokemon.types.some((typeInfo) => typeInfo.type.name === selectedType)
        );
      }

      setFilteredPokemon(filtered);
    };

    filterPokemon();
  }, [searchTerm, selectedType, allPokemon]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <SearchControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          pokemonTypes={pokemonTypes}
        />

        <PokemonList
          pokemon={filteredPokemon}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
