import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import App from "../App";

describe("App component", () => {
  test("toggles theme and updates button text", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    );

    // By default the theme state is set to light, so the button should say "Switch to Dark Mode"
    const toggleBtn = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    expect(toggleBtn).toBeInTheDocument();

    // User clicks the button
    userEvent.click(toggleBtn);

    // After user click, the text should switch to "Switch to Light Mode"
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();

    // Click again to switch back
    userEvent.click(
      screen.getByRole("button", { name: /switch to light mode/i })
    );
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });
});
