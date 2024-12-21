import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadAssignments,
  saveAssignments,
  getEligibleParticipants,
  updatePreferences,
} from "../utils/participants";
import SpinnerWheel from "../components/SpinnerWheel/SpinnerWheel";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem/SortableItem";
import PropTypes from "prop-types";
import "./pages.css";

const PreferencesPage = ({ name }) => {
  const [categories, setCategories] = useState([]);
  const [isPreferencesSubmitted, setIsPreferencesSubmitted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [options, setOptions] = useState([]); // Store eligible participants for the spinner
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {

    setCategories([
      "Movies",
      "Books",
      "I'm Just a Girl",
      "Travel",
      "Food & Drinks",
      "Games",
      "Tech Gadgets",
    ]);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = categories.indexOf(active.id);
      const newIndex = categories.indexOf(over.id);
      setCategories((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleSubmitPreferences = async () => {
    setIsPreferencesSubmitted(true);
    await updatePreferences(name, categories); // Save preferences to the database

    // Fetch eligible participants after submitting preferences
    const assignments = await loadAssignments();
    const eligibleParticipants = getEligibleParticipants(name, assignments);
    setOptions(eligibleParticipants.map((p) => p.name));
  };

  const handleSpin = async () => {
    setSpinning(true);

    const assignments = await loadAssignments();

    // If the user already has an assignment, redirect to results
    if (assignments[name]) {
      setSpinning(false);
      navigate(`/results?name=${name}`);
      return;
    }

    // Assign a random participant
    const randomIndex = Math.floor(Math.random() * options.length);
    const assignedSanta = options[randomIndex];

    // Update and save assignments
    assignments[name] = assignedSanta;
    await saveAssignments(assignments);

    setSpinning(false);
    navigate(`/results?name=${name}`);
  };

  return (
    <div className="preferences_page pages">
      {!isPreferencesSubmitted ? (
        <div className="intro_preferences">
          <h1>Hello, {name}!</h1>
          <p>Drag and drop to prioritize your interests:</p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories}
              strategy={verticalListSortingStrategy}
            >
              <ul className="sortable-list_preferences">
                {categories.map((category) => (
                  <SortableItem key={category} id={category} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
          <button onClick={handleSubmitPreferences}>Submit Preferences</button>
        </div>
      ) : (
        <div>
          <h2>Thank you, {name}!</h2>
          <p>Spin the wheel to assign your Secret Santa:</p>
          <SpinnerWheel
            spinning={spinning}
            onSpin={handleSpin}
            name={name}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

PreferencesPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PreferencesPage;
