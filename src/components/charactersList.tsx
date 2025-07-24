// Package imports
import { FC, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// File imports
import { charactersListState } from "../atoms/charactersListState";

// Component imports
import CharacterCard from "./characterCard";

// Style imports
import "../styles/charactersList.css";
import "swiper/css";
import "swiper/css/navigation";

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
    <>
      <div className="character-list-header">
        <h1 className="header">Star Wars Universe Explorer</h1>
      </div>
      <div className="characters-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {characters.map((_, index) => (
            <SwiperSlide key={index}>
              <CharacterCard index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CharactersList;
