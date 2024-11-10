import express, { json } from "express";

import { createServer } from "http";

import cors from "cors";

import taskRouter from "./routes/taskRouter.js";

import userRouter from "./routes/userRouter.js";

import { config } from "dotenv";

import { connectToDataBase } from "./config/dbConfig.js";

config(); // Load environment variables

const port = process.env.PORT;
const app = express();
app.use(cors()); // Enable CORS
app.use(json()); // Enable JSON parsing for request bodies

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

// Set up routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter); 


connectToDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  });