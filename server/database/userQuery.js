
import { pool } from "../config/dbConfig.js";

export const fetchUserByMail = async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      return rows[0]; // Return the first user (since email is unique)
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Unable to fetch user by email');
    }
  };
  
  // Insert a new user into the database
  export const InsertUser = async (name, email, hashedPassword) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
      return { message: 'User created successfully', userId: result.insertId };
    } catch (error) {
      console.error('Error inserting user:', error);
      throw new Error('Unable to insert user');
    }
  };
  
  // Fetch all users from the database
  export const fetchAllUsers = async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Unable to fetch all users');
    }
  };
  
  // Fetch a user by userId
  export const fetchUserById = async (userId) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      return rows[0]; // Return the user data
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Unable to fetch user by ID');
    }
  };