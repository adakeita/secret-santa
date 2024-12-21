import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ResultPage from "./pages/Result.jsx";
import Snowfall from "./components/SnowFall/SnowFall.jsx";

const App = () => {
  return (
    <div>
      <Snowfall />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:name" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
