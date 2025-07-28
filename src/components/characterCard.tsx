import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { characterListState } from "../atoms/characterListState";
import { characterCardLoadingState } from "../atoms/characterCardLoadingState";
import StormTrooper from "../images/icons8-star-wars-480.png";
import { CharacterCardProps } from "../helpers/helpers";

import "../styles/characterCard.css";

const CharacterCard: FC<CharacterCardProps> = ({ index }) => {
  // State
  const charactersList = useRecoilValue(characterListState);
  const [loading, setLoading] = useRecoilState(characterCardLoadingState);
  const navigate = useNavigate();

  // Destructure character properties
  const character = charactersList[index];
  const { name, gender } = character;

  const openCharacterDetailPage = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/character/${index}`);
    }, 800);
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <div className="character-card">
        <section className="character-info-img">
          <img className="img" src={StormTrooper} alt="Character" />
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
    </>
  );
};

export default CharacterCard;
