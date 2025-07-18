import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

// components
import { charactersState } from "../atoms/charactersState";

const Characters: React.FC = () => {
  const [characters, setCharacters] = useRecoilState(charactersState);

  useEffect(() => {
    // Fetch character data from: https://swapi.info/api/people
    fetch("https://swapi.info/api/people")
      .then((res) => res.json())
      // set characters state with the fetched data
      .then((json) => setCharacters(json))
      // handle any errors that occur during the fetch
      .catch((error) =>
        console.error("yeet error fetching starwars data: ", error)
      );
  }, [setCharacters]);

  return (
    <div className="characters-container">
      <h1>Star Wars Characters</h1>
      {characters.map((character, index) => (
        <div key={index}>{JSON.stringify(character)}</div>
      ))}
    </div>
  );
};

export default Characters;
