import { render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CharacterList from "../components/characterList";

jest.mock("../components/characterCard", () => {
  return ({ index }: { index: number }) => <div>CharacterCard {index}</div>;
});

describe("CharacterList", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { name: "Luke Skywalker", gender: "male" },
            { name: "Leia Organa", gender: "female" },
          ]),
      })
    ) as jest.Mock;
  });

  it("renders header and character cards after fetch", async () => {
    render(
      <RecoilRoot>
        <CharacterList />
      </RecoilRoot>
    );

    // Check Header
    const header = screen.getByText("Star Wars Universe Explorer");
    expect(header).toBeInTheDocument();

    // Character cards should load
    await waitFor(() => {
      expect(screen.getByText("CharacterCard 0")).toBeInTheDocument();
      expect(screen.getByText("CharacterCard 1")).toBeInTheDocument();
    });
  });
});
