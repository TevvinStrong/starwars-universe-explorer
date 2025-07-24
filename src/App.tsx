// Package imports
import { Route, Routes } from "react-router-dom";

// Component imports
import CharactersList from "./components/charactersList";
import CharacterDetailPage from "./components/characterDetailPage";

// Style imports
import "./App.css";

/**
 * Not Ideal but I decided to install an oldeer version of react@18.3.1, Reocil does not support the latest version of React @19.1.0
 * Typicall using an dependencies that supports the latest version of React is the best way to go, however I wanted to use Recoil for state management
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
