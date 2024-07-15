import { useState } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = (property, newValue) => {
    const { currentUser } = useContext(AuthContext);
    const baseUrl = "http://localhost:3001/users/{currentUser";

  const patchData = async (url, property, value, currentUser, updateCurrentUser, setEditingUsername) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [property]: value }), // Dynamically set the property and its value
      });

      if (response.ok) {
        updateCurrentUser({ ...currentUser, [property]: value }); // Update the current user state
        setEditingUsername(false); // Example of setting editing state to false after successful update
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