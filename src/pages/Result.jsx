import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadAssignments, loadPreferences } from "../utils/participants";
import { QRCodeCanvas } from "qrcode.react";
import "./pages.css";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [santa, setSanta] = useState(null);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const assignments = await loadAssignments();
      const preferences = await loadPreferences();

      // Get the assigned Santa and their preferences
      const assignedSanta = assignments[name] || "No one assigned yet";
      const santaPreferences = preferences[assignedSanta] || [
        "No preferences set",
      ];

      setSanta(assignedSanta);
      setLikes(santaPreferences);
    };

    fetchData();
  }, [name]);

  const qrValue = `${window.location.origin}/results?name=${name}`;

  return (
    <div className="result_page pages">
      <h1>Secret Santa Results</h1>
      <div className="results_wrapper">
        <h2>Hello, {name}!</h2>
        <div className="santa-information_results">
          <p>
            The spending limit is set at <strong>300nok</strong>.
          </p>
        </div>

        <div className="final-info_results">
          <p className="secret-name_results">
            Your Secret Santa is: <strong>{santa}</strong>
          </p>
          <p className="pro-list_results">Here is their prioritised list:</p>
          <ul className="likes-list_results">
            {likes.map((like, index) => (
              <li key={index}>{like}</li>
            ))}
          </ul>
        </div>

        <div className="qr_code_section">
          <p>Save this QR code to revisit your results:</p>
          <QRCodeCanvas value={qrValue} size={150} />
          <p>
            Or share this link: <a href={qrValue}>{qrValue}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
