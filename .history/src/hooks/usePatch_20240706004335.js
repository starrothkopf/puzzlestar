import { useState } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = ({property, newValue}) => {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);
    const url = `http://localhost:3001/users/${currentUser.id}`; // like "username" or "last_play_time_wordle"

    try {
      const response = fetch(url, {
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

export default usePatch;