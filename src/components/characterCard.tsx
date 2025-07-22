import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";

import { charactersListState } from "../atoms/charactersListState";
import { detailPageState } from "../atoms/detailPageState";

// Styles
import "../styles/characterCard.css";
import "swiper/css";

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
    <Swiper spaceBetween={0} slidesPerGroupSkip={1}>
      <SwiperSlide>
        <section className="character-info">
          {name}
          {gender}
          <button onClick={openCharacterDetailPage}>View More</button>
        </section>
      </SwiperSlide>
    </Swiper>
  );
};

export default CharacterCard;
