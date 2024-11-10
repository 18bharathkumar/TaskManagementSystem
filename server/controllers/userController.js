import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { fetchUserByMail,fetchUserById,InsertUser} from '../database/userQuery.js';
config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(req, res) {
    const { name, email, password} = req.body;
    console.log(name,email,password);
    const hashedPassword = await hash(password, 10);
    console.log("hashedPassword->",hashedPassword);
    
    const newUser = await InsertUser(name,email,hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("LOGIN Attempt:", { email , password}); 
    const user = await fetchUserByMail(email);
    console.log(user);
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id,name:user.name}, JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: 'Error logging in', error });
  }
}

export async function getUserProfile(req, res) {
  try {
    const usr = req.user;
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
}
