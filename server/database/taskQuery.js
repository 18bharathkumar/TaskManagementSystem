import { pool } from "../config/dbConfig.js";

// Fetch all tasks for a specific user
export const fetchAllTasks = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Unable to fetch tasks');
  }
};

// Insert a new task for a specific user
export const InsertTask = async (taskData) => {
  const { tname, desc, dd, pp, prio ,stat, usrid } = taskData;
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, due_date, processing_percentage, priority ,status, user_id) VALUES (?,?, ?, ?, ?, ?, ?)',
      [tname, desc, dd, pp, prio ,stat, usrid]
    );
    return { message: 'Task created successfully', taskId: result.id };
  } catch (error) {
    console.error('Error inserting task:', error);
    throw new Error('Unable to insert task');
  }
};

// Fetch a specific task by user ID and task ID
export const fetchTask = async (userId, taskId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? AND id = ?', [userId, taskId]);
    if (rows.length === 0) {
      throw new Error('Task not found');
    }
    return rows[0];
  } catch (error) {
    console.error('Error fetching task:', error);
    throw new Error('Unable to fetch task');
  }
};

// Modify a specific task by user ID and task ID
export const ModifyTask = async (taskData) => {
  const { desc, dd, pp, stat ,prio ,usrId ,tskId} = taskData;
  
  try {
    const [result] = await pool.query(
      'UPDATE tasks SET description = ?, due_date = ?, processing_percentage = ?, status = ?, priority = ? WHERE user_id = ? AND id = ?',
      [desc, dd, pp, stat, prio, usrId, tskId]
    );    
    if (result.affectedRows === 0) {
      throw new Error('Task not found');
    }
    return { message: 'Task updated successfully' };
  } catch (error) {
    console.error('Error modifying task:', error);
    throw new Error('Unable to update task');
  }
};

// Delete a task by user ID and task ID
export const TruncateTask = async (userId, taskId) => {
  try {
    console.log(`Attempting to delete task with userId: ${userId} and taskId: ${taskId}`);

    // Check if the task exists before deletion
    const [task] = await pool.query('SELECT * FROM tasks WHERE user_id = ? AND id = ?', [userId, taskId]);

    if (task.length === 0) {
      console.log(`No task found with userId: ${userId} and taskId: ${taskId}`);
      throw new Error('Task not found');
    }

    // If the task exists, delete it
    const [result] = await pool.query('DELETE FROM tasks WHERE user_id = ? AND id = ?', [userId, taskId]);
    if (result.affectedRows === 0) {
      throw new Error('Task not found');
    }

    return { message: 'Task deleted successfully' };
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw new Error('Unable to delete task');
  }
};
