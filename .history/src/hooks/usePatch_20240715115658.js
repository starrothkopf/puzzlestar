import { useContext, useCallback } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const patchData = useCallback(async (field, value) => {
    const url = `http://localhost:3001/users/${currentUser["id"]}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }), // Dynamically set the property and its value
      });

      if (response.ok) {
        const updatedUser = await response.json();
        const keys = field.split('.');
        if (keys.length > 1) {
          let temp = updatedUser;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) {
              temp[keys[i]] = {};
            }
            temp = temp[keys[i]];
          }
          temp[keys[keys.length - 1]] = value;
        } else {
          updatedUser[field] = value;
        }
      } else {
        console.error(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  }, [currentUser, updateCurrentUser]);

  return { patchData };
};

export default usePatch;