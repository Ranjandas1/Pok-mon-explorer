import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import FavoritesList from "./components/FavoritesList";
import SearchControls from "./components/SearchControls";
import Pagination from "./components/Pagination";
import {
  getAllPokemonTypes,
  fetchPokemonList,
  fetchPokemonDetails,
} from "./services/pokemonService";
import { PokemonWithDetails } from "./types/pokemon";

function App() {
  const [pokemon, setPokemon] = useState<PokemonWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const listResponse = await fetchPokemonList(150);
        const pokemonDetailsPromises = listResponse.results.map((pokemon) =>
          fetchPokemonDetails(pokemon.name)
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        const formattedPokemon = pokemonDetails.map((pokemon) => ({
          ...pokemon,
          displayName: pokemon.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }));

        setPokemon(formattedPokemon);
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

  // Step 1: Filter the list
  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const matchesSearch = p.displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        !selectedType || p.types.some((t) => t.type.name === selectedType);
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchTerm, selectedType]);

  // Step 2: Paginate the filtered list
  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, currentPage, itemsPerPage]);

  // Step 3: Sort only the current page
  const sortedCurrentPagePokemon = useMemo(() => {
    return [...paginatedPokemon].sort((a, b) => {
      if (sortBy === "name") return a.displayName.localeCompare(b.displayName);
      if (sortBy === "-name") return b.displayName.localeCompare(a.displayName);
      if (sortBy === "id") return a.id - b.id;
      if (sortBy === "-id") return b.id - a.id;
      return 0;
    });
  }, [paginatedPokemon, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchControls
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  pokemonTypes={getAllPokemonTypes()}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                <PokemonList
                  pokemon={sortedCurrentPagePokemon}
                  isLoading={isLoading}
                  error={error}
                />

                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      filteredPokemon.length / itemsPerPage
                    )}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </div>
              </>
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route
            path="/favorites"
            element={<FavoritesList allPokemon={pokemon} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
