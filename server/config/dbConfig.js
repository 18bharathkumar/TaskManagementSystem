import { config } from "dotenv";
import mysql from "mysql2/promise";  // Use the promise-based version

// Load environment variables
config();

// MySQL configuration
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB_NAME;
const PORT = process.env.DB_PORT;

// Create a MySQL connection pool
export const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB,
    port: PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

// Modify the connectToDataBase function to use async/await
export const connectToDataBase = async () => {
    try {
        // Use the promise-based `getConnection` method
        const connection = await pool.getConnection();
        console.log("Database Connected Successfully");
        connection.release(); // Release the connection after use
    } catch (error) {
        console.error("Error while connecting to the database:", error.message);
        throw new Error("Getting error while connecting to the database");
    }
};
