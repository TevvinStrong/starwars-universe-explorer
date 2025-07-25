import { useRecoilState } from "recoil";
import { Route, Routes } from "react-router-dom";

import { themeState } from "./atoms/themeState";

import CharacterList from "./components/characterList";
import CharacterDetailPage from "./components/characterDetailPage";

import "./App.css";

/**
 * Not Ideal but I decided to install an oldeer version of react@18.3.1, Reocil does not support the latest version of React @19.1.0
 * Typicall using an dependencies that supports the latest version of React is the best way to go, however I wanted to use Recoil for state management
 */
const App: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <div className={`App ${theme}`}>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
