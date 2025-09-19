let habits = JSON.parse(localStorage.getItem("habits")) || [];
let progress = JSON.parse(localStorage.getItem("progress")) || {};

const habitList = document.getElementById("habitList");
const habitInput = document.getElementById("habitInput");
let chart;

// Add a new habit
function addHabit() {
  const habit = habitInput.value.trim();
  if (habit && !habits.includes(habit)) {
    habits.push(habit);
    progress[habit] = progress[habit] || 0;

    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("progress", JSON.stringify(progress));

    habitInput.value = "";
    renderHabits();
    updateChart();
  }
}

// Mark habit as done
function completeHabit(habit) {
  progress[habit] = (progress[habit] || 0) + 1;
  localStorage.setItem("progress", JSON.stringify(progress));
  updateChart();
}

// Render habits list
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit) => {
    const div = document.createElement("div");
    div.className = "habit-item";
    div.innerHTML = `
      <span>${habit}</span>
      <button onclick="completeHabit('${habit}')">Done</button>
    `;
    habitList.appendChild(div);
  });
}

// Chart.js progress chart
function updateChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  const labels = Object.keys(progress);
  const values = Object.values(progress);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Habit Progress",
          data: values,
          backgroundColor: "#4cafef",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

// Initialize on load
renderHabits();
updateChart();
