// script.js

document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const options = Array.from(document.querySelectorAll('.option'));
    const nextButton = document.getElementById('next-btn');
    const feedbackButton = document.getElementById('feedback-btn');
    const completionGif = document.getElementById('completion-gif');
    const questionImage = document.getElementById('question-image');
    const funFactContainer = document.getElementById('fun-fact-container');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMessage = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    
    let currentQuestionIndex = 0;
    let score = 0;
    let shuffledQuestions = [];

    const questions = [
        {
            question: "What is the name of Frodo's sword?",
            options: [
                { text: "Glamdring", correct: false },
                { text: "Orcrist", correct: false },
                { text: "Sting", correct: true },
                { text: "Anduril", correct: false }
            ],
            image: "assets/images/sting.jpg",
            funFact: "Sting glows blue when orcs are nearby."
        },
        {
            question: "Who is the creator of the One Ring?",
            options: [
                { text: "Gandalf", correct: false },
                { text: "Sauron", correct: true },
                { text: "Saruman", correct: false },
                { text: "Elrond", correct: false }
            ],
            image: "assets/images/onering.jpg",
            funFact: "Sauron forged the One Ring in the fires of Mount Doom."
        },
        // Add more questions as needed
    ];

    feedbackButton.addEventListener('click', () => {
        window.location.href = 'feedback.html';
    });

    function startGame() {
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        questionContainer.classList.remove('hidden');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        questionImage.src = question.image;
        questionImage.alt = question.question;
        options.forEach((button, index) => {
            button.innerText = question.options[index].text;
            button.dataset.correct = question.options[index].correct;
            button.addEventListener('click', selectAnswer);
        });
    }

    function resetState() {
        while (options.firstChild) {
            options.removeChild(options.firstChild);
        }
        nextButton.classList.add('hidden');
        funFactContainer.classList.add('hidden');
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (correct) {
            score++;
        }
        Array.from(options).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hidden');
        } else {
            showCompletionGif();
        }
        showFunFact(shuffledQuestions[currentQuestionIndex]);
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('incorrect');
    }

    function showFunFact(question) {
        funFactContainer.innerText = question.funFact;
        funFactContainer.classList.remove('hidden');
    }

    function showCompletionGif() {
        questionContainer.classList.add('hidden');
        completionGif.classList.remove('hidden');
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    startGame();
});
