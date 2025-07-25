// Define shape of character object and related data
export interface CharacterType {
  name: string;
  gender: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  homeworld: string;
  species: string[];
  starships: string[];
}

export interface RelatedData {
  homeworld?: string;
  species?: string[];
  starships?: string[];
}

// Define props for CharacterCard component
export interface CharacterCardProps {
  index: number;
}
