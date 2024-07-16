import { useContext, useCallback } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const patchData = useCallback(async (field, value) => {
    const url = `http://localhost:3001/users/${currentUser["id"]}`;

    try {
      const keys = field.split('.');
      let updateObj = {};
      let temp = updateObj;

      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = i === keys.length - 2 ? { ...currentUser[keys[0]] } : {};
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObj), 
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateCurrentUser(updatedUser);
        return updatedUser;
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