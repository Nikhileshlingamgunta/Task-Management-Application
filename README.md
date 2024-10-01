# Task-Management-Application
Overview
This project is a Task Management Application built using React, Flask, and MySQL. The application allows users to manage their tasks with functionalities like:

Task creation, including due dates, priorities, and importance levels.
Color-coded priorities for visual distinction.
Task filtering by priority and due date.
Completion tracking, where users can mark tasks as completed.
Data persistence with MySQL to ensure tasks remain after refresh or server restarts.
NLP-powered task recommendations: When a user enters a task, an NLP analysis runs in the background, potentially providing a related recommended task.

Tech Stack
Frontend:
React.js: User interface, task filtering, and handling the frontend logic.
Material-UI: For responsive and styled input fields, buttons, and other components.

Backend:
Flask (Python): REST API backend to process tasks and run NLP analysis.
spaCy: A natural language processing library used for analyzing tasks and providing recommendations based on task content.
Database:

MySQL: Task data is persisted using a MySQL database to allow data persistence even after refreshes or server restarts.

Key Features
Task Input and Display: Users can input tasks with due dates, priorities, and importance levels, which are then displayed in a list.
Priority Indicators: Tasks are color-coded based on their priority (High, Medium, Low).
Task Filtering: Tasks can be filtered by priority or due date.
Task Completion: Tasks can be marked as completed, which updates the status in the database.
NLP-Powered Recommendations: The system analyzes entered tasks using NLP and recommends a related task based on the content.\

Setup Instructions
Prerequisites
Node.js: For running the React frontend.
Python: For the Flask backend.
MySQL: For database storage.
spaCy: For NLP analysis.
