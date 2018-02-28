$(document).ready(function () {

    //Doing this with a game object. Trying to use objects to get better practice because they still don't make sense
    //Create an object where keys are questions, and those keys hold dictionaries with the question number key,
    //which holds the value for their question, answers, correctAnswer, and whether or not they've been used yet
    var triviaGame = {
        Questions: {
            Q1: {
                question: "What is the air speed velocity of an unladen swallow?",
                answers: ["I don't know that!", "25mph", "25mps"],
                correctAnswer: "I don't know that!",
                isPulled: false,
            },
            Q2: {
                question: "The sun rises in the east and sets in the west",
                answers: ["True", "False"],
                correctAnswer: "True",
                isPulled: false,
            },
        },

        qPulled: null,
        displayQ: null,
        displayAnswer: null,
        correct: 0,
        incorrect: 0,

        // Pull randomly from object full of questions and display that question
        // Ideally want to display answers too, but want to get questions up and running first
        pullQuestion: function () {
            var questionKeys = Object.keys(triviaGame.Questions);
            qPulled = questionKeys[Math.floor(Math.random() * questionKeys.length)];
            displayQ = triviaGame.Questions[qPulled].question;
            //So console log correctly logs displayQ. I cannot write it to the DOM for some reason
            console.log(displayQ);
            $("#question").text(displayQ);

        },
    };
    triviaGame.pullQuestion();

    //Be able to mark the question as pulled, so as to not repeat any
    //Start a timer when each question is pulled, which is the amount of time the user has to complete the question

    //2) Take user clicks on the respective answers and match them against the correct answers
    //If correct, then show a screen congratulating them for the right option. 
    //Delay a few seconds, then display next Question without user prompt
    //If incorrect, inform the player they were wrong, display the correct answer, 
    //Then delay a few seconds and display next question without user prompt
    //If timeout, inform the player time is up and display the correct answer,
    //then delay a few seconds and display next question without user prompt

    //3 Once all questions have been iterated through, display a final screen showing:
    //number of correct answers, incorrect answers, and an option to restart the game

});