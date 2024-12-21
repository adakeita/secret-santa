import { fetchData, saveData } from "./jsonbin";

// Final 6 participants
export const participants = [
  { name: "Mathilde", cannotHave: ["Marthe"], preferences: [] },
  { name: "Marthe", cannotHave: ["Mathilde"], preferences: [] },
  { name: "Tumi", cannotHave: ["Mo"], preferences: [] },
  { name: "Mo", cannotHave: ["Tumi"], preferences: [] },
  { name: "Kim", cannotHave: ["Curtis"], preferences: [] },
  { name: "Curtis", cannotHave: ["Kim"], preferences: [] },
];

// Load assignments from JSONBin
export const loadAssignments = async () => {
  const savedData = await fetchData();
  return savedData.assignments || {};
};

// Save assignments to JSONBin
export const saveAssignments = async (assignments) => {
  const savedData = await fetchData();
  savedData.assignments = { ...savedData.assignments, ...assignments };
  await saveData(savedData);
};

// Get eligible participants
export const getEligibleParticipants = (currentName, assignments) => {
  return participants.filter(
    (p) =>
      p.name !== currentName && // Exclude the current user
      !p.cannotHave.includes(currentName) && // Respect restrictions
      !Object.values(assignments).includes(p.name) // Exclude already assigned participants
  );
};

// Update preferences in JSONBin
export const updatePreferences = async (name, preferences) => {
  const savedData = await fetchData();
  savedData.preferences = {
    ...savedData.preferences,
    [name]: preferences,
  };
  await saveData(savedData);
};

// Load preferences from JSONBin
export const loadPreferences = async () => {
  const savedData = await fetchData();
  return savedData.preferences || {};
};
