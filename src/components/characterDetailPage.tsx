// Package imports
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// File imports
import { charactersListState } from "../atoms/charactersListState";
import { CharacterType } from "../helpers/helpers";
import { RelatedData } from "../helpers/helpers";

// Style imports
import "../styles/characterDetailPage.css";

const CharacterDetailPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const characterIndex = parseInt(id || "0", 10);
  const charactersList = useRecoilValue(charactersListState) as CharacterType[];
  const character = charactersList[characterIndex];

  const [related, setRelated] = useState<RelatedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!character) return;

    async function fetchRelated() {
      try {
        const [home, ...others] = await Promise.all([
          character.homeworld
            ? fetch(character.homeworld).then((r) => r.json())
            : null,
          ...character.species.map((url) => fetch(url).then((r) => r.json())),
        ]);

        const starshipsData = await Promise.all(
          character.starships.map((url) => fetch(url).then((r) => r.json()))
        );

        setRelated({
          homeworld: home?.name,
          species: others.map((s) => s.name),
          starships: starshipsData.map((s) => s.name),
        });
      } catch (err) {
        console.error("Error fetching related data", err);
      } finally {
        // Pulled this from stackoverflow to ensure loading state is set correctly
        // https://stackoverflow.com/questions/75392123/set-loading-with-react-useeffect-fails
        setLoading(false);
      }
    }

    fetchRelated();
  }, [character]);

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
        <div className="spinner-overlay">
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

            {related?.species && related.species.length > 0 && (
              <span className="related-field">
                <strong>Species: </strong> {related.species.join(", ")}
              </span>
            )}

            {related?.starships && related.starships.length > 0 && (
              <span className="related-field">
                <strong>Starships: </strong> {related.starships.join(", ")}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetailPage;
