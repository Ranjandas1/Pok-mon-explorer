import { Pokemon, PokemonListResponse } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (
  limit: number = 150
): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (
  nameOrId: string
): Promise<Pokemon> => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokemon ${nameOrId}:`, error);
    throw error;
  }
};

export const getPokemonTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  };

  return typeColors[type] || "bg-gray-400";
};

export const getTextColorForType = (type: string): string => {
  const darkTextTypes = ["electric", "ice", "normal", "fairy", "bug"];
  return darkTextTypes.includes(type) ? "text-gray-800" : "text-white";
};

export const getAllPokemonTypes = (): {
  value: string;
  label: string;
  color: string;
}[] => {
  return [
    { value: "", label: "All Types", color: "bg-gray-200" },
    { value: "normal", label: "Normal", color: "bg-gray-400" },
    { value: "fire", label: "Fire", color: "bg-red-500" },
    { value: "water", label: "Water", color: "bg-blue-500" },
    { value: "electric", label: "Electric", color: "bg-yellow-400" },
    { value: "grass", label: "Grass", color: "bg-green-500" },
    { value: "ice", label: "Ice", color: "bg-blue-200" },
    { value: "fighting", label: "Fighting", color: "bg-red-700" },
    { value: "poison", label: "Poison", color: "bg-purple-500" },
    { value: "ground", label: "Ground", color: "bg-yellow-700" },
    { value: "flying", label: "Flying", color: "bg-indigo-300" },
    { value: "psychic", label: "Psychic", color: "bg-pink-500" },
    { value: "bug", label: "Bug", color: "bg-lime-500" },
    { value: "rock", label: "Rock", color: "bg-yellow-800" },
    { value: "ghost", label: "Ghost", color: "bg-purple-700" },
    { value: "dragon", label: "Dragon", color: "bg-indigo-700" },
    { value: "dark", label: "Dark", color: "bg-gray-800" },
    { value: "steel", label: "Steel", color: "bg-gray-500" },
    { value: "fairy", label: "Fairy", color: "bg-pink-300" },
  ];
};
