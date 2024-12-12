// Initialize global variables
let currentWeek = new Date();
let goals = [];

// Function to toggle calendar view
function toggleCalendar() {
  const calendar = document.getElementById('calendar');
  const isVisible = calendar.style.display !== 'none';
  calendar.style.display = isVisible ? 'none' : 'flex';
}

// Function to navigate between weeks
function changeWeek(direction) {
  currentWeek.setDate(currentWeek.getDate() + direction * 7);
  generateCalendar();
}

// Function to generate the calendar based on the current week
function generateCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Clear existing calendar

  const startOfWeek = getStartOfWeek(currentWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set the end of the week (7 days)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Loop to create each day for the calendar
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    const dayContainer = document.createElement('div');
    dayContainer.classList.add('calendar-day');
    dayContainer.innerHTML = `
      <div class="week-day">${daysOfWeek[i]}</div>
      <div class="date">${day.getDate()}</div>
      <div class="task-container">
        <input type="checkbox" id="task-${i}" onclick="handleTaskToggle(${i})">
        <span class="task-text" id="task-text-${i}">Task for ${day.getDate()}</span>
      </div>
      <div class="habit-container">
        <input type="checkbox" id="habit-${i}" onclick="handleHabitToggle(${i})">
        <span class="task-text" id="habit-text-${i}">Habit for ${day.getDate()}</span>
      </div>
    `;
    calendar.appendChild(dayContainer);
  }
}

// Function to get the start date of the current week
function getStartOfWeek(date) {
  const day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // Adjust if Sunday
  return new Date(date.setDate(diff));
}

// Function to handle task toggle (completed/not completed)
function handleTaskToggle(dayIndex) {
  const taskText = document.getElementById(`task-text-${dayIndex}`);
  const taskCheckbox = document.getElementById(`task-${dayIndex}`);
  
  if (taskCheckbox.checked) {
    taskText.classList.add('completed');
  } else {
    taskText.classList.remove('completed');
  }
}

// Function to handle habit toggle (completed/not completed)
function handleHabitToggle(dayIndex) {
  const habitText = document.getElementById(`habit-text-${dayIndex}`);
  const habitCheckbox = document.getElementById(`habit-${dayIndex}`);
  
  if (habitCheckbox.checked) {
    habitText.classList.add('completed');
  } else {
    habitText.classList.remove('completed');
  }
}

// Function to add a new goal
function addGoal() {
  const goalText = document.getElementById('goal-text').value;
  if (goalText.trim() === '') return; // Prevent adding empty goals

  goals.push(goalText);
  renderGoals();
  document.getElementById('goal-text').value = ''; // Clear input field
}

// Function to render the list of goals
function renderGoals() {
  const goalsList = document.getElementById('goals-list');
  goalsList.innerHTML = ''; // Clear the existing list

  goals.forEach((goal, index) => {
    const goalContainer = document.createElement('div');
    goalContainer.classList.add('goal-container');
    goalContainer.innerHTML = `
      <span class="goal-text">${goal}</span>
      <button onclick="deleteGoal(${index})">Delete</button>
      <div class="goal-progress">Progress: 0%</div>
    `;
    goalsList.appendChild(goalContainer);
  });
}

// Function to delete a goal from the list
function deleteGoal(index) {
  goals.splice(index, 1);
  renderGoals(); // Re-render goals after deletion
}

// Initialize the calendar and other elements
generateCalendar();
