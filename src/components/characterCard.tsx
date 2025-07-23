// Package imports
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// File imports
import { charactersListState } from "../atoms/charactersListState";
import { detailPageState } from "../atoms/detailPageState";
import StormTrooper from "../images/icons8-star-wars-480.png";

// Component imports
// import CharacterDetailPage from "./characterDetailPage";

// Style imports
import "../styles/characterCard.css";

interface CharacterCardProps {
  index: number;
}

const CharacterCard: FC<CharacterCardProps> = ({ index }) => {
  // State
  const charactersList = useRecoilValue(charactersListState);
  const isOpen = useRecoilValue(detailPageState);
  const setIsOpen = useSetRecoilState(detailPageState);

  // Also want to ensure the index for swipper
  const character = charactersList[index];

  // Destructure character properties
  const { name, gender } = character;

  const openCharacterDetailPage = () => {
    // Set the detail page state to true to open the character detail page
    setIsOpen(true);

    //TODO: Set up route so that when view more is clicked, it navigates to the character detail page
  };
  return (
    <div className="character-card">
      <section className="character-info-img">
        <img className="img" src={StormTrooper}></img>
      </section>
      <section className="character-info">
        <span className="character-info-name">{name}</span>
        <span className="character-info-gender">{gender}</span>
        <div className="character-info-btn">
          <button className="btn" onClick={openCharacterDetailPage}>
            View More
          </button>
        </div>
      </section>
    </div>
  );
};

export default CharacterCard;
