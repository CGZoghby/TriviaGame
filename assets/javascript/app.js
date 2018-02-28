$(document).ready(function () {

    //currently have an issue with multiple time instances

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
        unanswered: 0,
        timer: 30,

        // Pull randomly from object full of questions and display that question along with its possible answers
        pullQuestion: function () {
            //Pull each possible question key into an array
            var questionKeys = Object.keys(triviaGame.Questions);
            //randomly select one of those questions
            qPulled = questionKeys[Math.floor(Math.random() * questionKeys.length)];
            //IF it has not been selected before, display the question and its answers, otherwise move to the else statement
            if (triviaGame.Questions[qPulled].isPulled === false) {
                displayQ = triviaGame.Questions[qPulled].question;
                displayAnswer = triviaGame.Questions[qPulled].answers
                $("#question").html("<p> " + displayQ + "</p>");
                for (var i = 0; i < displayAnswer.length; i++) {
                    $("#b" + i).html(displayAnswer[i]);
                }
                //This hides unused question slots
                $(".button").each(function () {
                    if ($(this).html().length === 0) {
                        $(this).css("visibility", "hidden")
                    } else {
                        $(this).css("visibility", "visible")
                    }
                });
                triviaGame.Questions[qPulled].isPulled = true;
            } else {
                //So this kinda works. pullQuestion breaks if there are no more unpulled questions, then I could throw an exception clause that moves to the game results screen
                //Otherwise, need to find a way for the function to set gameFinished to true if and only if it runs pullQuestion without ever entering the if statement.
                try {
                    triviaGame.pullQuestion();
                }
                catch (error) {
                    //this works. So what I will do is on the catch, go to the results screen.
                    $("#question").html("All done, heres how you did!");
                    $("#b0").html("Correct Answers: " + triviaGame.correct);
                    $("#b1").html("Incorrect Answers: " + triviaGame.incorrect);
                    $("#b2").html("Unanswered: " + triviaGame.unanswered).css("visibility", "visible");
                    $("#b3").css("visibility", "hidden")
                }
            };
        },

        checkAnswer: function (buttonPress) {
            if (buttonPress["innerText"] === triviaGame.Questions[qPulled].correctAnswer) {
                console.log("correct!");
                triviaGame.correct++;
            } else {
                console.log("incorrect!")
                triviaGame.incorrect++;
            };
        },

        startTimer: function () {
            triviaGame.timer = 30;
            setInterval(triviaGame.decrement, 1000);
        },

        decrement: function () {
            triviaGame.timer--;
            $("#timer").html("Time Remaining: " + triviaGame.timer + " seconds.")
            if (triviaGame.timer === 0) {
                triviaGame.unanswered++;
                triviaGame.pullQuestion();
                clearInterval(triviaGame.decrement);
                triviaGame.startTimer();
            };
        }

        //also need a resetfunction, which sets all questions to unpulled, sets counters to 0, and pulls another question

    };

    //these are just placeholders for the startgame button
    triviaGame.startTimer();
    triviaGame.pullQuestion();

    //When answer is clicked
    $("#answer").on("click", "button", function () {
        triviaGame.checkAnswer(this);
        $("#b0").empty();
        $("#b1").empty();
        $("#b2").empty();
        $("#b3").empty();
        clearInterval(triviaGame.startTimer);
        setTimeout(triviaGame.startTimer, 3000);
        setTimeout(triviaGame.pullQuestion, 3000);
    });

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