// Sample days of the week for calendar
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Dynamic calendar generation
function generateCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear previous calendar
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of current week

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000); // Increment day
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    // Header for day
    const dayHeader = document.createElement("div");
    dayHeader.className = "week-day";
    dayHeader.textContent = daysOfWeek[day.getDay()];
    dayElement.appendChild(dayHeader);

    // Date
    const dateElement = document.createElement("div");
    dateElement.className = "date";
    dateElement.textContent = day.toDateString();
    dayElement.appendChild(dateElement);

    // Task input area
    const taskInput = document.createElement("input");
    taskInput.className = "task-input";
    taskInput.type = "text";
    taskInput.placeholder = "Add a task...";
    dayElement.appendChild(taskInput);

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskButton.className = "add-task-btn";
    addTaskButton.onclick = () => addTask(day.toDateString(), taskInput.value);
    dayElement.appendChild(addTaskButton);

    // Task container
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.id = `tasks-${day.toDateString()}`; // Unique ID for the task container
    dayElement.appendChild(taskContainer);

    calendar.appendChild(dayElement);
  }
}

// Task management
let tasks = {};

// Add task
function addTask(date, taskText) {
  if (!taskText.trim()) return; // Ignore empty tasks

  if (!tasks[date]) tasks[date] = []; // Initialize task list for the date
  tasks[date].push({ text: taskText, completed: false });
  updateTaskDisplay(date);
}

// Mark task as completed
function toggleTaskCompletion(date, index) {
  if (tasks[date]) {
    tasks[date][index].completed = !tasks[date][index].completed;
    updateTaskDisplay(date);
  }
}

// Delete task
function deleteTask(date, index) {
  if (tasks[date]) {
    tasks[date].splice(index, 1);
    updateTaskDisplay(date);
  }
}

// Update task display for a specific day
function updateTaskDisplay(date) {
  const taskContainer = document.getElementById(`tasks-${date}`);
  taskContainer.innerHTML = ""; // Clear current tasks

  if (tasks[date]) {
    tasks[date].forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = `task ${task.completed ? "completed" : ""}`;

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskElement.appendChild(taskText);

      const completeButton = document.createElement("button");
      completeButton.textContent = task.completed ? "Undo" : "Complete";
      completeButton.className = "complete-task-btn";
      completeButton.onclick = () => toggleTaskCompletion(date, index);
      taskElement.appendChild(completeButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-task-btn";
      deleteButton.onclick = () => deleteTask(date, index);
      taskElement.appendChild(deleteButton);

      taskContainer.appendChild(taskElement);
    });
  }
}

// Toggle calendar visibility
function toggleCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.style.display = calendar.style.display === "none" ? "flex" : "none";
}

// Navigation for weeks (placeholder, no actual week change)
function changeWeek(direction) {
  alert(direction === 1 ? "Next week (placeholder)" : "Previous week (placeholder)");
}

// Initial page load
document.addEventListener("DOMContentLoaded", generateCalendar);
