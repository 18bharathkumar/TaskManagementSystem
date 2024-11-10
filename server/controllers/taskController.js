
import { fetchAllTasks,fetchTask,ModifyTask,InsertTask,TruncateTask } from "../database/taskQuery.js";


export async function getAllTasks(req, res) {
  try {
    const userId = req.user.id; // Extract the user's ID from the request (assumes authentication is implemented)

    const tasks = await fetchAllTasks(userId);

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
}
export const createTask = async (req, res) => {
  try {
    const { name, description, due_date,processing_percentage, priority, status } = req.body;
    const userId = req.user.id;  // Get the logged-in user's ID
    const Newtask = {
      tname : name ,
      desc : description,
      dd: due_date,
      pp:processing_percentage,
      prio : priority ,
      stat : status,
      usrid : userId
    }
    const result = await InsertTask(Newtask);
    res.status(201).json({ message: 'Task created successfully', result });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export async function getTask(req, res) {
  try {
    const userId = req.user.id; // User ID of the logged-in user
    const taskId = req.params.id; // Task ID from the route parameters

    const task = await fetchTask(userId,taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to access this task' });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: 'Error fetching task', error });
  }
}

export async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const { description,due_date,processing_percentage,status, priority } = req.body;
    const userId = req.user.id;  // Ensure the task belongs to the user
    const Updatetask = {
      desc : description,
      dd : due_date,
      pp:processing_percentage,
      stat:status,
      prio:priority,
      usrId:userId,
      tskId : taskId
    }
    const task = await ModifyTask(Updatetask);
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: 'Error updating task', error });
  }
}
export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    console.log(taskId,userId);
    const task = await TruncateTask(userId,taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
}

