import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import "./spinnerwheel.css";

const SpinnerWheel = ({ spinning, onSpin, name, options }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [rotation, setRotation] = useState(0);

  // Ensure exactly 6 segments for the wheel
  const filledOptions = useMemo(() => {
    const result = [...options];
    while (result.length < 6) {
      result.push("❓"); // Fallback emoji for empty slots
    }
    return result;
  }, [options]);

  useEffect(() => {
    if (spinning) {
      const randomIndex = Math.floor(Math.random() * filledOptions.length);
      const targetSegment = randomIndex;

      // Calculate rotation
      const segmentAngle = 360 / 6;
      const fullRotations = 5; // Add extra spins for excitement
      const endRotation =
        fullRotations * 360 + targetSegment * segmentAngle + segmentAngle / 2;

      setRotation(endRotation);

      setTimeout(() => {
        setSelectedIcon(filledOptions[targetSegment]);
      }, 5000);
    }
  }, [spinning, filledOptions]);

  return (
    <div className="spinner-container">
      <button onClick={onSpin} disabled={spinning} className="spin-button">
        {spinning ? "Spinning..." : `Spin for ${name}`}
      </button>
      <div className="spinner">
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 5s cubic-bezier(0.33, 1, 0.68, 1)"
              : "none",
          }}
        >
          {filledOptions.map((icon, index) => (
            <div key={index} className={`segment`} style={{ "--index": index }}>
              <span>{icon}</span>
            </div>
          ))}
        </div>
        <div className="pointer"></div>
      </div>
      {selectedIcon && !spinning && (
        <div className="selected-icon">
          <h3>Selected: {selectedIcon}</h3>
        </div>
      )}
    </div>
  );
};

SpinnerWheel.propTypes = {
  spinning: PropTypes.bool.isRequired,
  onSpin: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SpinnerWheel;
