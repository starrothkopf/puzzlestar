import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const usePatch = () => {
  const { updateCurrentUser } = useContext(AuthContext);

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
        const updatedUser = { ...currentUser };
        const keys = property.split('.');
        let temp = updatedUser;
        for (let i = 0; i < keys.length - 1; i++) {
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = newValue;
        updateCurrentUser(updatedUser); 
        return updatedUser;
      } else {
        console.error(`Failed to update ${property}`);
      }
    } catch (error) {
      console.error(`Error updating ${property}:`, error);
    }
  }, [updateCurrentUser]);

  return { patchData };
};

export default usePatch;