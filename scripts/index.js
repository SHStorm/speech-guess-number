window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new SpeechRecognition();

const puzzledNum = randomNum();
let isPlaying = true;

speechRecognition.start();
speechRecognition.addEventListener('result', handleSpeechResult);
speechRecognition.addEventListener('end', handleSpeechEnd);

function handleSpeechResult(event) {
    handleGuess(event.results[event.resultIndex][0].transcript);
}

function handleSpeechEnd() {
    if (!isPlaying) {
        return;
    }

    speechRecognition.start();
}

function handleGuess(guess) {
    const $guessPanel = document.getElementById('guess-panel');
    const $guess = document.getElementById('guess');
    const $message = document.getElementById('message');

    $guessPanel.classList.toggle('visible', true);
    $guess.textContent = guess.toString();

    guess = Number(guess);
    if (Number.isNaN(guess)) {
        $message.textContent = 'This is not a valid number';
        return;
    }

    let message;
    if (guess > puzzledNum) {
        message = 'Go lower';
    } else if (guess < puzzledNum) {
        message = 'Go higher';
    } else {
        message = 'You guessed it!';
    }

    $message.textContent = message;

    if (puzzledNum === guess) {
        gameWon();
    }
}

function gameWon() {
    isPlaying = false;
    speechRecognition.stop();

    const $app = document.getElementById('app');
    const $puzzledNum = document.getElementById('puzzled-number');

    $puzzledNum.textContent = puzzledNum.toString();

    $app.dataset.screen = 'game-finished';
}

function randomNum() {
    return Math.floor(1 + Math.random() * 100);
}
