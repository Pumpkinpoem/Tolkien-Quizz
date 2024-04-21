function checkAnswer(selectedOption) {
    // You can replace this logic with your actual answer checking logic
    const correctAnswer = 2; // For example, option 2 is the correct answer

    if (selectedOption === correctAnswer) {
        document.getElementById('feedback').innerText = "Correct!";
        // Add any other actions you want to perform for a correct answer
    } else {
        document.getElementById('feedback').innerText = "Incorrect!";
        // Add any other actions you want to perform for an incorrect answer
    }
}
