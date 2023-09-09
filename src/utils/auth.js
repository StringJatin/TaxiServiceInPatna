// utils/auth.js
import fs from 'fs/promises';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export async function authenticateUser(username, password) {
  try {
    // Ensure this code only runs on the server side
    if (typeof window === 'undefined') {
      const usersData = await fs.readFile(usersFilePath, 'utf-8');
      const users = JSON.parse(usersData).users;

      const user = users.find((user) => user.username === username && user.password === password);

      return user;
    }
    return null; // Return null on the client side
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}
