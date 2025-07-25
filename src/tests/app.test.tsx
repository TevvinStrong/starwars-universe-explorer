import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import App from "../App";

describe("App component", () => {
  test("renders app and toggle theme button", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    // Check button is in document
    const toggleButton = screen.getByRole("button", {
      name: /switch to dark mode/i, // matches button text ignoring case
    });
    expect(toggleButton).toBeInTheDocument();
  });
});
