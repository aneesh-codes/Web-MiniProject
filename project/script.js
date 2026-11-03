const questions = [
    {
        question: "Which HTML tag is used to create a paragraph?",
        answers: [
            { text: "<p>", correct: true },
            { text: "<para>", correct: false },
            { text: "<paragraph>", correct: false },
            { text: "<pr>", correct: false }
        ]
    },
    {
        question: "Which CSS property changes the text color?",
        answers: [
            { text: "font-size", correct: false },
            { text: "color", correct: true },
            { text: "background", correct: false },
            { text: "padding", correct: false }
        ]
    },
    {
        question: "Which JavaScript keyword is used to declare a constant?",
        answers: [
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "const", correct: true },
            { text: "final", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to add a link address?",
        answers: [
            { text: "src", correct: false },
            { text: "href", correct: true },
            { text: "class", correct: false },
            { text: "id", correct: false }
        ]
    },
    {
        question: "Which JavaScript function displays an alert box?",
        answers: [
            { text: "console.log()", correct: false },
            { text: "prompt()", correct: false },
            { text: "alert()", correct: true },
            { text: "message()", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;
    updateProgressBar();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        if (button === selectedButton && isCorrect) {
            button.classList.add("correct");
        }

        if (button === selectedButton && !isCorrect) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
    }

    nextButton.style.display = "block";

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Show Score";
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    progressBar.style.width = "100%";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        if (nextButton.innerHTML === "Play Again") {
            startQuiz();
        } else {
            showScore();
        }
    }
});

startQuiz();