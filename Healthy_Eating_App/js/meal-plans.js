// Set current week
function setCurrentWeek() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    
    const options = { month: 'long', day: 'numeric' };
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    document.getElementById('currentWeek').textContent = 
        `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
}

// Generate meal plan based on preferences
function generateMealPlan() {
    const dietType = document.getElementById('diet-type').value;
    const calories = document.getElementById('calories').value;
    const allergies = document.getElementById('allergies').value;
    
    // Show progress bar
    const progressBar = document.getElementById('planProgress');
    const progressText = document.querySelector('.progress-text');
    
    progressBar.style.width = '0%';
    progressText.textContent = 'Analyzing your preferences...';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        
        if (progress === 20) progressText.textContent = 'Generating meal options...';
        if (progress === 50) progressText.textContent = 'Calculating nutritional values...';
        if (progress === 80) progressText.textContent = 'Finalizing your plan...';
        
        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = 'Meal plan generated successfully!';
            
            // In a real app, this would update the meal plan based on preferences
            setTimeout(() => {
                alert('Your personalized meal plan has been generated based on your preferences!');
            }, 500);
        }
    }, 150);
}

// Initialize meal plans page
document.addEventListener('DOMContentLoaded', function() {
    setCurrentWeek();
    
    document.getElementById('generatePlan').addEventListener('click', generateMealPlan);
    
    // Add event listeners to recipe buttons
    document.querySelectorAll('.recipe-btn').forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would show the recipe modal
            alert('Recipe details would be displayed here. This feature requires a premium subscription.');
        });
    });
});