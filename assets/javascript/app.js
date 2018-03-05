$(document).ready(function () {
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
                question: "The name of the enchanter with goat horns is...",
                answers: ["Fred", "George", "Ceasar", "Tim"],
                correctAnswer: "Tim",
                isPulled: false,
            },
            Q2: {
                question: "What was King Arthur banging together to imitate the sounds of a horse?",
                answers: ["Mangos", "Skulls", "Horseshoes", "Coconuts"],
                correctAnswer: "Coconuts",
                isPulled: false,
            },
            Q3: {
                question: "What did the peasant claim the 'witch' turned him into?",
                answers: ["A cockroach", "A newt", "A rabbit", "An insect"],
                correctAnswer: "A newt",
                isPulled: false,
            },
            Q4: {
                question: "How many limbs did the black knight lose before he declared his duel between King Arthur 'a draw?'",
                answers: ["1", "2", "3", "4"],
                correctAnswer: "4",
                isPulled: false,
            },
            Q5: {
                question: "For how many seconds should you count after pulling the pin from the Holy Hand Grenade, before you throw it?",
                answers: ["2", "3", "4", "It's a grenade, pull the pin and throw it and run!"],
                correctAnswer: "3",
                isPulled: false,
            },
            Q6: {
                question: "Which country taunted King Arthur and his companions from atop their castle?",
                answers: ["The French", "The Spanish", "The Danes", "The Swedes"],
                correctAnswer: "The French",
                isPulled: false,
            },
            Q7: {
                question: "The Knights who say Ni demand a...?",
                answers: ["prisoner", "rabbit", "witch", "shrubbery"],
                correctAnswer: "shrubbery",
                isPulled: false,
            },
            Q8: {
                question: "Those found at fault during the opening credit were...",
                answers: ["fined", "bagged", "sacked", "promoted"],
                correctAnswer: "sacked",
                isPulled: false,
            },
            Q9: {
                question: "How does the movie end?",
                answers: ["They are arrested by the 70s British police", "they find the grail", "there is an epic battle"],
                correctAnswer: "They are arrested by the 70s British police",
                isPulled: false,
            }
        },
        //Define variables to be used in the methods declared below
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
            //Additionally, need to empty any response pictures, and the question slots (this javascript can handle true/false and multiple choice because of this)
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
                //This hides unused question slots, builds in compatibility for true/false questions (I was testing with those because they were easier to write haha)
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
                //Otherwise, need to find a way for the function to set a variable gameFinished to true if and only if it runs pullQuestion without ever entering the if statement.
                try {
                    //The error that this try-catch block hangs on is that pullQuestion will start infinitely looping
                    triviaGame.pullQuestion();
                }
                catch (error) {
                    //this works. So what I will do is on the catch, go to the results screen.
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

        //Method for checking clicked answer against possible answers.
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

        //startTime, stopTimer, and decrement all hinge around timer display, and what to do with timing out on questions
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
    //Only click this button once then I make the start button disappear! Better to empty, instead of render invisible, because allowed for more display space for the reaction gif and
    //questions
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

    //This will only display on game completion
    $("#resetButton").on("click", function () {
        triviaGame.reset();
    });
});