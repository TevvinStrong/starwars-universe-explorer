import { render } from "@testing-library/react";
import App from "./App";

// Testing app here individually, will test components at each compnent level
test("renders app", () => {
  render(<App />);
});
