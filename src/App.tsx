// Package imports
import { RecoilRoot } from "recoil";

// Component imports
import CharactersList from "./components/charactersList";

// Style imports
import "./App.css";

/**
 * Not Ideal but I decided to install an oldeer version of react@18.3.1, Reocil does not support the latest version of React @19.1.0
 * Typicall using an dependencies that supports the latest version of React is the best way to go, however I wanted to use Recoil for state management
 */
const App: React.FC = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <h1>Star Wars Universe Explorer</h1>
        <CharactersList />
      </div>
    </RecoilRoot>
  );
};

export default App;
