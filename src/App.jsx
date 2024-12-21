import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./pages/Home.jsx";
import ResultPage from "./pages/Result.jsx";
import Snowfall from "./components/SnowFall/SnowFall.jsx";
import MenuPage from "./pages/Menu.jsx";
import ItineraryPage from "./pages/Itinerary.jsx";

const App = () => {
  return (
    <div>
      <Snowfall />
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:name" element={<ResultPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
