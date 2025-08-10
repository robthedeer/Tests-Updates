import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const auth = getAuth(app);
const database = getDatabase(app);

// Initialize progress charts
document.addEventListener('DOMContentLoaded', function() {
    // Weight Progress Chart
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const weightChart = new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: ['Sep 1', 'Sep 15', 'Oct 1', 'Oct 15', 'Oct 30'],
            datasets: [{
                label: 'Weight (kg)',
                data: [65.2, 66.0, 66.5, 67.0, 67.5],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Weight Progress Over Time',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 64,
                    title: {
                        display: true,
                        text: 'Kilograms (kg)'
                    }
                }
            }
        }
    });

    // Journal entry functionality
    document.getElementById('addJournalBtn').addEventListener('click', function() {
        alert('Journal entry feature would open a form to add new entries. This feature requires user authentication.');
    });
});
// Event listener for saving weight
document.getElementById('save-weight')?.addEventListener('click', async () => {
    const weight = document.getElementById('weight').value;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;

            // Save the weight to Firebase Realtime Database
            set(ref(database, 'users/' + userId + '/weight'), weight)
                .then(() => {
                    console.log("Weight saved successfully!");
                    // Refresh the chart with the new data
                    updateChart(userId);
                })
                .catch((error) => {
                    console.error("Error saving weight:", error);
                });
        } else {
            // If user is not logged in, redirect to the login page
            window.location.href = 'login.html';
        }
    });
});

async function updateChart(userId) {
    const database = getDatabase(app);
    const weightRef = ref(database, 'users/' + userId + '/weight');

    try {
        const snapshot = await get(weightRef);
        if (snapshot.exists()) {
            const weight = snapshot.val();
            // Mock time for now; needs to be a real timestamp
            const time = new Date().toLocaleTimeString();

            updateChartWithData(time, weight); // Pass time and weight to chart update
        } else {
            console.log("No weight data available");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateChartWithData(time, weight) {
    const ctx = document.getElementById('progress-chart')?.getContext('2d');
    if (ctx) {
        // Destroy old chart if it exists
        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [time], // Dynamically updating labels array
                datasets: [{
                    label: 'Weight (lbs)',
                    data: [weight], // Dynamically updating data array
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    } else {
        console.error("Chart context not available");
    }
}