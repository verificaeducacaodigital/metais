
/* =====================================
   MENU RESPONSIVO
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

    });

});


/* =====================================
   EXPERIÊNCIA DE ELETRÓLISE
===================================== */

const startExperiment = document.getElementById("startExperiment");
const resetExperiment = document.getElementById("resetExperiment");

const object = document.getElementById("object");
const ions = document.getElementById("ions");

const experimentMessage = document.getElementById("experimentMessage");

let experimentTimer = null;

startExperiment.addEventListener("click", function() {

    clearTimeout(experimentTimer);

    object.classList.remove("plated");
    ions.classList.remove("active");

    void object.offsetWidth;

    ions.classList.add("active");

    experimentMessage.textContent =
        "Eletrólise iniciada! Os íons metálicos estão se deslocando em direção ao cátodo.";

    startExperiment.disabled = true;

    experimentTimer = setTimeout(function() {

        object.classList.add("plated");
        ions.classList.remove("active");

        experimentMessage.textContent =
            "Experiência concluída! A peça recebeu uma camada metálica ilustrativa.";

        startExperiment.disabled = false;

    }, 4000);

});


resetExperiment.addEventListener("click", function() {

    clearTimeout(experimentTimer);

    object.classList.remove("plated");
    ions.classList.remove("active");

    startExperiment.disabled = false;

    experimentMessage.textContent =
        "Experiência reiniciada! Clique em iniciar para começar novamente.";

});


/* =====================================
   QUIZ INTERATIVO
===================================== */

const questions = [

    {
        question: "1. O que é a cromagem?",

        answers: [
            "Um processo de pintura comum.",
            "Um processo de revestimento com cromo.",
            "Um processo de derretimento de metais.",
            "Um processo de fabricação de plástico."
        ],

        correct: 1
    },

    {
        question: "2. Qual é a função da eletrólise na eletrodeposição?",

        answers: [
            "Derreter o objeto.",
            "Resfriar o metal.",
            "Provocar reações químicas usando energia elétrica.",
            "Transformar metal em plástico."
        ],

        correct: 2
    },

    {
        question: "3. O que acontece no cátodo?",

        answers: [
            "Ocorre a redução dos íons.",
            "Ocorre apenas a evaporação.",
            "Ocorre a combustão.",
            "Ocorre a fusão do metal."
        ],

        correct: 0
    },

    {
        question: "4. O que acontece com os íons metálicos na eletrodeposição?",

        answers: [
            "Eles desaparecem.",
            "Eles recebem elétrons e formam metal sólido.",
            "Eles viram água.",
            "Eles se transformam em gás."
        ],

        correct: 1
    },

    {
        question: "5. Qual é uma vantagem da cromagem?",

        answers: [
            "Diminuir a resistência do objeto.",
            "Destruir a superfície metálica.",
            "Aumentar o desgaste.",
            "Melhorar o acabamento e a resistência superficial."
        ],

        correct: 3
    }

];


/* VARIÁVEIS DO QUIZ */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* ELEMENTOS DO QUIZ */

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");

const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartQuiz");

const resultElement = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");


/* MOSTRAR PERGUNTA */

function loadQuestion() {

    answered = false;

    feedbackElement.textContent = "";
    resultElement.textContent = "";

    nextButton.classList.add("hidden");
    restartButton.classList.add("hidden");

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    current.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);

    });

}


/* VERIFICAR RESPOSTA */

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(function(button, index) {

        button.disabled = true;

        if (index === current.correct) {
            button.classList.add("correct");
        }

    });

    if (selected === current.correct) {

        score++;

        feedbackElement.textContent =
            "✓ Muito bem! Você acertou!";

        feedbackElement.style.color = "#66e6a4";

    } else {

        selectedButton.classList.add("wrong");

        feedbackElement.textContent =
            "✗ Não foi dessa vez! A resposta correta está destacada em verde.";

        feedbackElement.style.color = "#ff8585";

    }

    nextButton.classList.remove("hidden");

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "Ver resultado";

    } else {

        nextButton.textContent = "Próxima pergunta →";

    }

}


/* PRÓXIMA PERGUNTA */

nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});


/* RESULTADO FINAL */

function showResult() {

    questionElement.textContent = "Quiz finalizado!";

    questionNumber.textContent = "Resultado final";

    answersElement.innerHTML = "";

    feedbackElement.textContent = "";

    nextButton.classList.add("hidden");

    progressBar.style.width = "100%";

    let message;

    if (score === 5) {

        message = "Excelente! Você domina o assunto!";

    } else if (score >= 3) {

        message = "Muito bem! Você aprendeu bastante!";

    } else {

        message = "Continue estudando! Você consegue melhorar!";

    }

    resultElement.textContent =
        `Você acertou ${score} de 5 perguntas. ${message}`;

    restartButton.classList.remove("hidden");

}


/* REINICIAR QUIZ */

restartButton.addEventListener("click", function() {

    currentQuestion = 0;
    score = 0;

    loadQuestion();

});


/* INICIAR QUIZ */

loadQuestion();
