import { Router } from "express";
const taskRouter = Router();
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authenticateJWT as _authenticateJWT } from "../middlewares/authMiddleware.js";
const authenticateJWT = _authenticateJWT;
taskRouter.post("/create", authenticateJWT, createTask);

taskRouter.get("/getAll", authenticateJWT, getAllTasks);

taskRouter.get("/getTask/:id", authenticateJWT, getTask);

taskRouter.put("/updateTask/:id", authenticateJWT, updateTask);

taskRouter.delete("/deleteTask/:id", authenticateJWT,deleteTask);

export default taskRouter
