import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import CharacterDetailPage from "../components/characterDetailPage";
import { characterListState } from "../atoms/characterListState";
import {
  relatedDataState,
  relatedDataLoadingState,
} from "../atoms/relatedDataState";
import { CharacterType } from "../helpers/helpers";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "0" }),
  };
});

beforeEach(() => {
  jest.resetAllMocks();
  // Mock fetch
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: "Tatooine" }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("CharacterDetailPage", () => {
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
      homeworld: "https://swapi.dev/api/planets/1/",
      species: [],
      starships: [],
    },
  ];

  test("renders character details and handles loading state", async () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(characterListState, mockCharacters);
          set(relatedDataState, null);
          set(relatedDataLoadingState, true);
        }}
      >
        <MemoryRouter initialEntries={["/character/0"]}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailPage />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );

    expect(screen.getByRole("progressbar")).toBeTruthy();

    // Wait for loading to finish
    await waitFor(
      () => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
      { timeout: 2000 }
    );

    // Check for character name
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    // Check character detail data
    const genderLabel = screen.getByText("Gender:");
    expect(genderLabel.parentElement).toHaveTextContent("male");

    const heightLabel = screen.getByText("Height:");
    expect(heightLabel.parentElement).toHaveTextContent("172");

    const homeworldLabel = screen.getByText("Homeworld:");
    expect(homeworldLabel.parentElement).toHaveTextContent("Tatooine");

    // Click back button calls navigate
    await userEvent.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
