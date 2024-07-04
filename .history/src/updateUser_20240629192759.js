const updateUserSolves = async (userId, newSolve) => {
    const response = await fetch(`http://localhost:3001/users/${userId}`);
    const user = await response.json();
  
    const updatedUser = {
      ...user,
      solves: [...user.solves, newSolve],
    };
  
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
  
    // Update the user state
    setUser(updatedUser);
  };