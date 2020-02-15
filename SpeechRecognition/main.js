const msgElement = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Display what user speaks into microphone
function writeMessage(msg) {
  msgElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check message against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgElement.innerHTML += "<div>That is not a valid number</div";
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgElement.innerHTML += "<div>Number must be between 1 an 100</div>";
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `<h2>Congrats you have guessed the number! <br><br> It was ${num}</h2><button class="play-again" id="play-again">Play Again</button>`;
  } else if (num > randomNum) {
    msgElement.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgElement.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start())

// Play again
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
})