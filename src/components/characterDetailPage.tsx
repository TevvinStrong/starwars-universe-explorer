import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  relatedDataState,
  relatedDataLoadingState,
} from "../atoms/relatedDataState";
import { characterListState } from "../atoms/characterListState";
import { CharacterType } from "../helpers/helpers";

import "../styles/characterDetailPage.css";

const CharacterDetailPage: FC = () => {
  // Use useNavigate to navigate back to the character list
  const navigate = useNavigate();

  // Get `id` parameter from the URL
  const { id } = useParams();

  // Convert string id to number index
  const characterIndex = parseInt(id || "0", 10);

  // Get the full list of characters from Recoil state
  const charactersList = useRecoilValue(characterListState) as CharacterType[];

  // Use the index to get the specific character
  const character = charactersList[characterIndex];

  // Related data and loading state from Recoil
  const [related, setRelated] = useRecoilState(relatedDataState);
  const [loading, setLoading] = useRecoilState(relatedDataLoadingState);

  // Reset functions to clear related data
  const resetRelated = useResetRecoilState(relatedDataState);
  const resetLoading = useResetRecoilState(relatedDataLoadingState);

  // Fetch related data 'homeworld, species, starships'
  useEffect(() => {
    if (!character) return;

    // Set loading to true to show spinner
    setLoading(true);

    // asynchronously fetch related data from SWAPI
    async function fetchRelated() {
      try {
        // Get homeworld and species data
        const [home, ...species] = await Promise.all([
          character.homeworld
            ? fetch(character.homeworld).then((r) => r.json())
            : null,
          ...character.species.map((url) => fetch(url).then((r) => r.json())),
        ]);

        // Get starship data
        const starshipsData = await Promise.all(
          character.starships.map((url) => fetch(url).then((r) => r.json()))
        );

        // Store related data in Recoil state
        setRelated({
          homeworld: home?.name,
          species: species.map((s) => s.name),
          starships: starshipsData.map((s) => s.name),
        });
      } catch (err) {
        console.error("Error fetching related data", err);
      } finally {
        // Set loading to false to remove spinner
        setLoading(false);
      }
    }
    // Call the fetch function
    fetchRelated();
    // Cleanup function on component unmount
    return () => {
      resetRelated();
      resetLoading();
    };
  }, [character, setRelated, setLoading, resetRelated, resetLoading]);

  // If no character is found, display a message
  if (!character) {
    return (
      <div className="character-detail-container">Character not found.</div>
    );
  }

  return (
    <div className="character-detail-container">
      <button className="detail-btn" onClick={() => navigate("/")}>
        <ArrowBackIosIcon />
      </button>

      <h1 className="character-detail-header">{character.name}</h1>

      {loading ? (
        <div className="spinner-overlay" role="progressbar">
          <div className="spinner" />
        </div>
      ) : (
        <div className="character-detail-card">
          <div className="detail-section">
            <span>
              <strong>Gender:</strong> {character.gender}
            </span>
            <span>
              <strong>Height:</strong> {character.height}
            </span>
            <span>
              <strong>Mass:</strong> {character.mass}
            </span>
            <span>
              <strong>Hair Color:</strong> {character.hair_color}
            </span>
            <span>
              <strong>Skin Color:</strong> {character.skin_color}
            </span>
            <span>
              <strong>Eye Color:</strong> {character.eye_color}
            </span>
            <span>
              <strong>Birth Year:</strong> {character.birth_year}
            </span>

            {related?.homeworld && (
              <span className="related-field">
                <strong>Homeworld: </strong> {related.homeworld}
              </span>
            )}

            {(related?.species ?? []).length > 0 && (
              <span className="related-field">
                <strong>Species: </strong> {related!.species!.join(", ")}
              </span>
            )}

            {(related?.starships ?? []).length > 0 && (
              <span className="related-field">
                <strong>Starships: </strong> {related!.starships!.join(", ")}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetailPage;
