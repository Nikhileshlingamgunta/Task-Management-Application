import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function TaskInput({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('3');
  const [setReminder, setSetReminder] = useState(false); 
  const [nlpData, setNlpData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      const taskData = { task, priority, dueDate, importance, setReminder }; 
      addTask(taskData);

      try {
        const response = await axios.post('http://127.0.0.1:5000/analyze', { task });
        setNlpData(response.data);
      } catch (error) {
        console.error("Error analyzing the task", error);
      }

      setTask('');
      setPriority('');
      setDueDate('');
      setImportance('');
      setSetReminder(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter a Task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Importance</InputLabel>
          <Select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={setReminder}
              onChange={(e) => setSetReminder(e.target.checked)}
            />
          }
          label="Set Reminder"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default TaskInput;
