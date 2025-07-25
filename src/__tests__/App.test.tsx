import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import App from "../App";

describe("App component", () => {
  test("renders app and toggle theme button", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });
});
