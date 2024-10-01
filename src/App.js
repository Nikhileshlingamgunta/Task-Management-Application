import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material'; // Import Material-UI components
import './App.css';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState({ priority: '', dueDate: '' });


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // const addTask = (task) => {
  //   setTasks([...tasks, { ...task, completed: false }]);
  //   generateRecommendations([...tasks, task]);
  // };
  const addTask = async (task) => {
    const taskData = {
      task: task.task,
      priority: task.priority,
      dueDate: task.dueDate,
      importance: task.importance
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/add_task', taskData);
      console.log(response.data);
      // Fetch the updated task list
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };
  
  const completeTask = async (taskId) => {
    try {
      const taskToUpdate = tasks[taskId];
      const updatedStatus = { completed: !taskToUpdate.completed }; // Toggle completion status
  
      // Send a PUT request to update the task in the database
      await axios.put(`http://127.0.0.1:5000/update_task/${taskToUpdate.id}`, updatedStatus);
  
      // Update the local state to reflect the change
      const updatedTasks = tasks.map((task, index) => 
        index === taskId ? { ...task, completed: !task.completed } : task
      );
  
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  // const completeTask = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].completed = !updatedTasks[index].completed;
  //   setTasks(updatedTasks);
  // };

  const generateRecommendations = (currentTasks) => {
    const keywords = currentTasks.map(task => task.task.toLowerCase());
    const uniqueKeywords = [...new Set(keywords)];
    const suggestedTasks = uniqueKeywords.map(keyword => `Consider doing something related to ${keyword}`);
    setRecommendations(suggestedTasks);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return new Date(a.dueDate) - new Date(b.dueDate) || priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Container maxWidth="lg"> {/* Use Material-UI Container */}
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}> {/* Add Paper for styling */}
        <h1 style={{ textAlign: 'center' }}> Task Management Application</h1>
        <Grid container spacing={3}> {/* Use Grid for layout */}
          <Grid item xs={12} md={6}> {/* Responsive layout */}
            <TaskInput addTask={addTask} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskList tasks={sortedTasks} completeTask={completeTask} filter={filter} setFilter={setFilter} />
          </Grid>
        </Grid>

        {recommendations.length > 0 && (
          <div>
            <h3>Recommendations</h3>
            <ul>
              {recommendations.map((rec, index) => (
                <li className='text-black' key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default App;
