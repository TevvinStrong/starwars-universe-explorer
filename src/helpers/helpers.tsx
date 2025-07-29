// Define character data structure
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

// Define related data structure
export interface RelatedDataType {
  homeworld?: string;
  species?: string[];
  starships?: string[];
}

// Define props for CharacterCard component
export interface CharacterCardProps {
  index: number;
}
