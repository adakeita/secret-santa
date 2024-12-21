import { useState } from "react";
import PreferencesPage from "./Prefrences";
import { participants } from "../utils/participants";
import "./pages.css";

const HomePage = () => {
  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  // Extract all participant names
  const participantNames = participants.map((participant) => participant.name);

  const handleNameSubmit = (selectedName) => {
    setName(selectedName);
    setIsNameSubmitted(true);
  };

  return (
    <div className="home_page pages">
      {!isNameSubmitted ? (
        <div className="intro_home">
          <h1>Welcome to Secret Santa</h1>
          <p>Select your name to get started:</p>
          <ul className="participant-list_home">
            {participantNames.map((participantName) => (
              <li className="participant-li_home" key={participantName}>
                <button
                  className="participant-button_home"
                  onClick={() => handleNameSubmit(participantName)}
                >
                  {participantName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <PreferencesPage name={name} />
      )}
    </div>
  );
};

export default HomePage;
