const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionButtons = document.getElementById('options').querySelectorAll('.option');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// Quiz data
const questions = [
    {
        question: "What is the capital of Gondor?",
        options: ["Minas Tirith", "Rohan", "Osgiliath", "Gondor City"],
        answer: "Minas Tirith",
        funFact: "Minas Tirith is also known as the White City and the City of Kings."
        
    },
    {
        question: "Who is Frodo's uncle?",
        options: ["Gandalf", "Saruman", "Bilbo Baggins", "Samwise Gamgee"],
        answer: "Bilbo Baggins",
        funFact: "Bilbo Baggins is a central character in 'The Hobbit' and 'The Lord of the Rings' series."
    },
    {
        question: "What is the name of Gandalf's sword?",
        options: ["Sting", "Glamdring", "Andúril", "Narsil"],
        answer: "Glamdring",
        funFact: "Glamdring was forged by the elves of Gondolin in the First Age."
    },
    {
        question: "Who is the ruler of Rohan?",
        options: ["Théoden", "Théodred", "Éowyn", "Éomer"],
        answer: "Théoden",
        funFact: "Théoden, son of Thengel, was the seventeenth King of Rohan, ruling for many years."
    },
    {
        question: "What creature is Gollum?",
        options: ["Hobbit", "Elf", "Dwarf", "Hobgoblin"],
        answer: "Hobbit",
        funFact: "Gollum, originally known as Sméagol, was a hobbit-like creature corrupted by the power of the One Ring."
    },
    {
        question: "Who created the One Ring?",
        options: ["Saruman", "Galadriel", "Elrond", "Sauron"],
        answer: "Sauron",
        funFact: "The One Ring was forged by the Dark Lord Sauron in the fires of Mount Doom."
    },
    {
        question: "What is the name of the elf who aids Frodo when he almost died?",
        options: ["Legolas", "Gimli", "Arwen", "Galadriel"],
        answer: "Arwen",
        funFact: "Arwen Evenstar, daughter of Elrond, was an elf who played a crucial role in the events of the War of the Ring."
    },
    {
        question: "What is the name of Aragorn's sword?",
        options: ["Sting", "Andúril", "Glamdring", "Narsil"],
        answer: "Andúril",
        funFact: "Andúril, also known as the Flame of the West, was reforged from the shards of Narsil and wielded by Aragorn as the rightful King of Gondor."
    },
    {
        question: "Where do Frodo need to go to destroy the one ring?",
        options: ["Minas Tirith", "Rivendell", "Lothlórien", "Mount Doom"],
        answer: "Mount Doom",
        funFact: "Mount Doom, located within the volcanic region of Mordor, was the only place where the One Ring could be destroyed."
    },
    {
        question: "Who said: 'One does not simply walk into Mordor'?",
        options: ["Gandalf", "Aragorn", "Boromir", "Frodo"],
        answer: "Boromir",
        funFact: "Boromir, son of Denethor, was a valiant warrior from Gondor who accompanied the Fellowship of the Ring on their journey."
    }
];


// Start the quiz
startQuiz();

// Event listeners for option buttons
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!answerSelected) { // Check if an answer has already been selected
            answerSelected = true; // Set answerSelected to true
            checkAnswer(button.textContent);
        }
    });
});

// Event listener for next button
nextButton.addEventListener('click', () => {
    if (answerSelected) { // Check if an answer has been selected
        answerSelected = false; // Reset answerSelected to false
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }
});

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    scoreElement.innerText = `Score: ${score}`;
    displayQuestion();
}


// Function to display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;

    // Set the image source based on the current question index
    const questionImage = document.getElementById('question-image');
    questionImage.src = `assets/images/question${currentQuestionIndex + 1}.jpg`;

    optionButtons.forEach((button, index) => {
        button.innerText = question.options[index];
        button.classList.remove('correct');
        button.classList.remove('incorrect');
    });
    feedbackElement.innerText = '';
}

// Function to check the answer
function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (answer === correctAnswer) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        feedbackElement.innerText = 'Correct!';
    } else {
        feedbackElement.innerText = `Incorrect. The correct answer is "${correctAnswer}".`;
    }
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === answer) {
            button.classList.add('incorrect');
        }
    });
    nextButton.style.display = 'block';
}

// Function to end the quiz
function endQuiz() {
    questionElement.innerText = 'Quiz completed!';
    optionButtons.forEach(button => button.style.display = 'none');
    feedbackElement.innerText = `Your final score is ${score}/${questions.length}.`;
}
