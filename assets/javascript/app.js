$(document).ready(function () {

    //currently have an issue with multiple time instances

    //Doing this with a game object. Trying to use objects to get better practice because they still don't make sense
    //Create an object where keys are questions, and those keys hold dictionaries with the question number key,
    //which holds the value for their question, answers, correctAnswer, and whether or not they've been used yet
    var triviaGame = {
        questions: {
            Q0: {
                question: "What is the air speed velocity of an unladen swallow?",
                answers: ["I don't know that!", "25mph", "25mps"],
                correctAnswer: "I don't know that!",
                isPulled: false,
            },
            Q1: {
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
        showTimer: null,

        // Pull randomly from object full of questions and display that question along with its possible answers
        pullQuestion: function () {
            $("#questionPic").empty()
            $("#b0").empty();
            $("#b1").empty();
            $("#b2").empty();
            $("#b3").empty();
            //Pull each possible question key into an array
            var questionKeys = Object.keys(triviaGame.questions);
            //randomly select one of those questions
            qPulled = questionKeys[Math.floor(Math.random() * questionKeys.length)];
            //IF it has not been selected before, display the question and its answers, otherwise move to the else statement
            if (triviaGame.questions[qPulled].isPulled === false) {
                displayQ = triviaGame.questions[qPulled].question;
                displayAnswer = triviaGame.questions[qPulled].answers
                $("#question").html("<p> " + displayQ + "</p>");
                for (var i = 0; i < displayAnswer.length; i++) {
                    $("#b" + i).html(displayAnswer[i]);
                }
                //This hides unused question slots
                $(".qbutton").each(function () {
                    if ($(this).html().length === 0) {
                        $(this).css("visibility", "hidden")
                    } else {
                        $(this).css("visibility", "visible")
                    }
                });
                triviaGame.questions[qPulled].isPulled = true;
            } else {
                //So this kinda works. pullQuestion breaks if there are no more unpulled questions, then I could throw an exception clause that moves to the game results screen
                //Otherwise, need to find a way for the function to set gameFinished to true if and only if it runs pullQuestion without ever entering the if statement.
                try {
                    triviaGame.pullQuestion();
                }
                catch (error) {
                    //this works. So what I will do is on the catch, go to the results screen.
                    //There is a very weird bug where if I answer none of the questions, the timer on the catch screen 
                    //continues to count down.
                    triviaGame.stopTimer();
                    $("#question").html("All done, here is how you did!");
                    $("#b0").html("Correct Answers: " + triviaGame.correct);
                    $("#b1").html("Incorrect Answers: " + triviaGame.incorrect);
                    $("#b2").html("Unanswered: " + triviaGame.unanswered).css("visibility", "visible");
                    $("#b3").css("visibility", "hidden");
                    $("#resetButton").css("visibility", "visible");
                }
            };
        },

        checkAnswer: function (buttonPress) {
            if (buttonPress["innerText"] === triviaGame.questions[qPulled].correctAnswer) {
                console.log("correct!");
                $("#questionPic").append("<img src=assets/images/rejoice.gif>")
                triviaGame.correct++;
            } else {
                console.log("incorrect!")
                $("#questionPic").append("The correct answer was " + triviaGame.questions[qPulled].correctAnswer);
                triviaGame.incorrect++;
            };
        },

        startTimer: function () {
            triviaGame.timer = 30;
            triviaGame.stopTimer();
            triviaGame.showTimer = setInterval(triviaGame.decrement, 1000);
        },

        stopTimer: function () {
            clearInterval(triviaGame.showTimer);
        },

        decrement: function () {
            triviaGame.timer--;
            $("#timer").html("Time Remaining: " + triviaGame.timer + " seconds.")
            if (triviaGame.timer === 0) {
                triviaGame.unanswered++;
                $("#questionPic").append("Time's up! The correct answer was " + triviaGame.questions[qPulled].correctAnswer);
                setTimeout(triviaGame.startTimer, 3000);
                setTimeout(triviaGame.pullQuestion, 3000);
            };
        },

        //also need a resetfunction, which sets all questions to unpulled, sets counters to 0, and pulls another question
        reset: function () {
            for (var i = 0; i < Object.keys(triviaGame.questions).length; i++) {
                triviaGame.questions["Q" + i].isPulled = false;
            };
            qPulled = null;
            displayQ = null;
            displayAnswer = null;
            triviaGame.correct = 0;
            triviaGame.incorrect = 0;
            triviaGame.unanswered = 0;
            triviaGame.startTimer();
            triviaGame.pullQuestion();
            $("#resetButton").css("visibility", "hidden");
        },
    };

    $("#startButton").on("click", function () {
        $("#start").empty();
        triviaGame.startTimer();
        triviaGame.pullQuestion();
        $("#game").css("visibility", "visible")
    });

    //When answer is clicked
    $("#answer").on("click", "button", function () {
        triviaGame.checkAnswer(this);
        setTimeout(triviaGame.startTimer, 3000);
        setTimeout(triviaGame.pullQuestion, 3000);
    });

    $("#resetButton").on("click", function () {
        triviaGame.reset();
    });
});