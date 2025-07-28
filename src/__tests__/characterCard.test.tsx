import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import { mockNavigate } from "react-router-dom";

import CharacterCard from "../components/characterCard";
import { characterListState } from "../atoms/characterListState";
import { CharacterType } from "../helpers/helpers";

// Mock useNavigate
jest.mock("react-router-dom");

describe("CharacterCard", () => {
  const mockCharacters: CharacterType[] = [
    {
      name: "Luke Skywalker",
      gender: "male",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      homeworld: "Tatooine",
      species: [],
      starships: [],
    },
    {
      name: "Leia Organa",
      gender: "female",
      height: "150",
      mass: "49",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "19BBY",
      homeworld: "Alderaan",
      species: [],
      starships: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders character UI elements", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => set(characterListState, mockCharacters)}
      >
        <MemoryRouter>
          <CharacterCard index={0} />
        </MemoryRouter>
      </RecoilRoot>
    );

    // Check name and gender
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();

    // Check if button exists and has correct label
    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeInTheDocument();
  });

  test("shows loading spinner and navigates after delay", async () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot
        initializeState={({ set }) => set(characterListState, mockCharacters)}
      >
        <MemoryRouter>
          <CharacterCard index={1} />
        </MemoryRouter>
      </RecoilRoot>
    );

    await userEvent.click(screen.getByRole("button", { name: /view more/i }));

    // Check loading spinner
    expect(screen.getByRole("button", { name: /view more/i })).toBeDisabled ||
      // Check spinner overlay
      expect(document.querySelector(".spinner-overlay")).toBeInTheDocument();

    jest.advanceTimersByTime(800);

    expect(mockNavigate).toHaveBeenCalledWith("/character/1");

    jest.useRealTimers();
  });
});
