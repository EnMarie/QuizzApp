const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// questions - hard coded
let questions = [
	{
		question: "What's the name of the river that runs through Egypt?",
		choice1: 'Nile',
		choice2: 'Amazon',
		choice3: 'Congo',
		choice4: 'Niger',
		answer: 1,
	},
	{
		question: "What's the highest mountain in the world?",
		choice1: 'Kilimanjaro',
		choice2: 'Elbrus',
		choice3: 'Mount Everest',
		choice4: 'Kosciuszko',
		answer: 3,
	},
	{
		question: 'Which citi is the largest city in the world?',
		choice1: 'Cairo',
		choice2: 'New York',
		choice3: 'Madrid',
		choice4: 'Tokyo',
		answer: 4,
	},
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];

	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);
		//go to end page
		return window.location.assign('end.html');
	}
	questionCounter++;
	progressText.innerText = 'Question ' + questionCounter + '/' + MAX_QUESTIONS;
	//update the progress bar
	progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + '%';

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
};
// right or wrong answer and bonus score
choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		const classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToApply === 'correct') {
			incrementScore(CORRECT_BONUS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});
// score
incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

startGame();
