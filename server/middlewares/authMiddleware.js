import jwt from "jsonwebtoken";
import { config } from "dotenv";

import { fetchUserByMail, fetchUserById } from "../database/userQuery.js";
config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	console.log("JWT_SECRET is not defined in the environment variables");
}
// export async function authorizeAdmin(req, res, next) {
// 	try {
// 		const user = req.user; 
// 		console.log("USER AUTHORIZE ADMIN: " + JSON.stringify(user));
		
// 		if (user.role !== 'admin') {
// 			return res.status(403).json({ message: 'Access forbidden: admins only' });
// 		}

// 		next();
// 	} catch (error) {
// 		console.error("Authorization error:", error);
// 		return res.status(500).json({ message: 'Server error', error: error.message });
// 	}
// }
export async function authenticateJWT(req, res, next) {  
	const token = req.headers["authorization"]?.startsWith('Bearer ') 
	  ? req.headers['authorization'].split(" ")[1] 
	  : req.headers['authorization'];
  
	if (!token) {
	  return res.status(403).json({ message: "No token provided" });
	}
  
	try {
	  const decoded = jwt.verify(token, JWT_SECRET);
	  const user = await fetchUserById(decoded.id);
	  console.log("ID form jwt",user.id);
	  if (!user) {
		return res.status(401).json({ message: "Unauthorized token - user not found" });
	  }
	  req.user = user;
	  next();
	} catch (error) {
	  console.log("JWT verification error:", error);
	  return res.status(401).json({ message: "Unauthorized", error: error.message });
	}
  }
  