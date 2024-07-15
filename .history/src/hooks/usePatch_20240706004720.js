import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const patchData = async (property, newValue) => {
    const url = `http://localhost:3001/users/${currentUser["id"]}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [property]: newValue }), // Dynamically set the property and its value
      });

      if (response.ok) {
        updateCurrentUser({ ...currentUser, [property]: newValue }); // Update the current user state
      } else {
        console.error(`Failed to update ${property}`);
      }
    } catch (error) {
      console.error(`Error updating ${property}:`, error);
    }
  };

  return { patchData };
};

export default usePatch;