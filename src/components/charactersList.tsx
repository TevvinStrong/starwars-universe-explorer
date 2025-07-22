import { FC, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { charactersListState } from "../atoms/charactersListState";

// Components
import CharacterCard from "./characterCard";

// Styles
import "../styles/charactersList.css";

const CharactersList: FC = () => {
  const characters = useRecoilValue(charactersListState);
  const setCharacters = useSetRecoilState(charactersListState);

  useEffect(() => {
    // Fetch character data from: https://swapi.info/api/people
    fetch("https://swapi.info/api/people")
      .then((res) => res.json())
      // Set characters state with the fetched data
      .then((json) => setCharacters(json))
      // Handle any errors that occur during the fetch
      .catch((error) =>
        console.error("yeet error fetching starwars data: ", error)
      );
  }, [setCharacters]);

  return (
    <div className="characters-container">
      {characters.map((_, index) => (
        <div key={index}>
          {
            // Render each character using the CharacterCard component
            <CharacterCard key={index} index={index} />
          }
        </div>
      ))}
    </div>
  );
};

export default CharactersList;
