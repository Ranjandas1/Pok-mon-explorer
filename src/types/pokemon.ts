export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonWithDetails extends Pokemon {
  displayName: string;
}

export type PokemonTypeOption = {
  value: string;
  label: string;
  color: string;
};

export type SortOption = {
  value: "id" | "name" | "-id" | "-name";
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: "id", label: "ID (Ascending)" },
  { value: "-id", label: "ID (Descending)" },
  { value: "name", label: "Name (A-Z)" },
  { value: "-name", label: "Name (Z-A)" },
];
