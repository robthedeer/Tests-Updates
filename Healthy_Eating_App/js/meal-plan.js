import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig.js';

const auth = getAuth(app);
// Example meal plan data (replace with data from Firebase)
const mealPlanData = {
    breakfast: {
        time: "8:00 AM",
        food: "Oatmeal with berries",
        portion: "1 cup"
    },
    lunch: {
        time: "12:00 PM",
        food: "Chicken salad sandwich",
        portion: "1 sandwich"
    },
    dinner: {
        time: "6:00 PM",
        food: "Baked salmon with vegetables",
        portion: "4 oz salmon, 1 cup vegetables"
    }
};

// Function to generate the meal plan
function generateMealPlan(mealPlan) {
    let mealPlanHTML = "";

    for (const meal in mealPlan) {
        mealPlanHTML += `
            <div class="meal">
                <h3>${meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
                <p>Time: ${mealPlan[meal].time}</p>
                <p>Food: ${mealPlan[meal].food}</p>
                <p>Portion: ${mealPlan[meal].portion}</p>
            </div>
        `;
    }

    return mealPlanHTML;
}

// Update the meal plan on the page
function updateMealPlan(mealPlan) {
    const mealPlanContent = document.getElementById("meal-plan-content");
    if (mealPlanContent) {
        mealPlanContent.innerHTML = generateMealPlan(mealPlan);
    }
}

// Event listener to load meal plan content once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If user is logged in, generate and update the meal plan
            updateMealPlan(mealPlanData); // Use example meal plan data here

        } else {
            // If user is not logged in, redirect to the login page
            window.location.href = 'login.html';
        }
    });
});