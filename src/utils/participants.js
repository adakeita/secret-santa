import { fetchData, saveData } from "./jsonbin";

export const participants = [
    // Real participants
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
  // Define groups
  const finalClients = ["Mathilde", "Marthe", "Tumi", "Mo", "Kim", "Curtis"];
  const groupA = ["Sarah", "Tom", "Mina", "Ellis"];

  // Find the group of the current user
  const currentGroup = finalClients.includes(currentName)
    ? finalClients
    : groupA;

  // Filter eligible participants
  return participants.filter(
    (p) =>
      p.name !== currentName && // Exclude the current user
      currentGroup.includes(p.name) && // Only allow assignments within the same group
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
