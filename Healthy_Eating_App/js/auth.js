import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebaseConfig.js';

const auth = getAuth(app);

// Sign-up
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Sign-up successful:", user);
        // Redirect to the meal plan page or another relevant page
        window.location.href = 'meal-plan.html';
    } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up: " + error.message);
    }
});

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Login successful:", user);
        // Redirect to the meal plan page or another relevant page
        window.location.href = 'meal-plan.html';
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Error logging in: " + error.message);
    }
});