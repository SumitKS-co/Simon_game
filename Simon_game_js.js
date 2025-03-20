// STEP 1: Initialize variables
let gamePattern = [];
let user_Click = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;
let high_score = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// STEP 2: Start game when a key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 1;
        h2.innerText = "Level " + level;
        nextSequence();
    }
});

// STEP 3: Generate a new sequence
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash effect to show the chosen color
    let colour_to_be_shown = document.querySelector("." + randomChosenColour);
    colour_to_be_shown.classList.add("flash");
    setTimeout(() => {
        colour_to_be_shown.classList.remove("flash");
    }, 300);

    // Play sound for the chosen color
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

// STEP 4: Detect user button clicks and store them
document.querySelectorAll(".btn").forEach(div => 
    {
    div.addEventListener("click", function () {
        let choosen_colour = this.id;
        user_Click.push(choosen_colour);
        
        // Play sound for user click
        let audio = new Audio("sounds/" + choosen_colour + ".mp3");
        audio.play();

        // Animation effect for user click
        this.classList.add("user_flash");
        setTimeout(() => {
            this.classList.remove("user_flash");
        }, 250);

        // Check user's answer
        checkAnswer(user_Click.length - 1);
    });
});

// STEP 5: Check user's input against game pattern
function checkAnswer(currentLevel) {
    if (user_Click[currentLevel] === gamePattern[currentLevel]) {
        console.log("🟩 Correct");

        // If user has completed the sequence correctly, move to the next level
        if (user_Click.length === gamePattern.length) {
            level++;
            h2.innerText = "Level " + level;
            
            // Update high score
            if (high_score < level) {
                high_score = level;
                h3.innerText = "High Score " + high_score;
            }

            // Generate next sequence after 1 second
            setTimeout(() => {
                nextSequence();
                user_Click = []; // Reset user input for next level
            }, 1000);
        }
    } else {
        console.log("❌ Wrong Answer");

        // Play wrong answer sound
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // Flash screen to indicate wrong answer
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        // Restart game
        startOver();
    }
}

// STEP 6: Reset game state if the user loses
function startOver() {
    level = 0;
    gamePattern = [];
    user_Click = [];
    started = false;
    document.querySelector("h2").innerText = "Game Over 😭, Press Any Key to Restart";
}
