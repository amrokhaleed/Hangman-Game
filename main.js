// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array of letters
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

// Object Of Words + categories

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property 
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomProbName = allKeys[randomPropNumber];
let randomProbValue = words[randomProbName];

let randomValueNumber = Math.floor(Math.random() * randomProbValue.length);

// Get Random Word from Random Category
let randomValueValue = randomProbValue[randomValueNumber];

document.querySelector(".category span").innerHTML = randomProbName;


// Get letter Guess 
let letterGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpaces = Array.from(randomValueValue);

lettersAndSpaces.forEach(letter => {
    let span = document.createElement("span");
    if (letter === ' ') {
        span.className = "with-space";
    }
    letterGuessContainer.appendChild(span);
});
// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");



let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
let rightguesses = 0;
// Handle Clicking On Letters
document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        // Get Clicked Letter
        let clickedLetter = e.target.innerHTML.toLowerCase();
        let chosenWord = Array.from(randomValueValue.toLowerCase());
        chosenWord.forEach((wordLetter, Wordindex) => {
            // If Clicked Letter Equal One of Chosen Word Letters
            if (clickedLetter == wordLetter) {
                theStatus = true;
                // Loop on All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    if (Wordindex == spanIndex) {
                        span.innerHTML = clickedLetter;
                        rightguesses++;
                    }
                });
            }
        });
        // If letter Is Wrong
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            document.getElementById("success").play();
        }
        if (rightguesses === randomValueValue.length) {
            endGame2();
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word is ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
}

function endGame2() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Congratulations You Won, The Word is ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
}