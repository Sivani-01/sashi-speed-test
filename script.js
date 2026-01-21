const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const progressBar = document.getElementById('progress-bar');
const themeToggle = document.getElementById('theme-toggle');
const highScoreElement = document.getElementById('high-score');

let timerInterval;
let isTyping = false;
let timeLeft;
let totalChars = 0;

// Dark Mode
themeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));

function renderNewQuote() {
    const level = document.getElementById('difficulty-select').value;
    const selectedQuotes = quotes[level];
    const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
    
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        // Animation effect
        span.style.animationDelay = `${index * 0.01}s`;
        quoteDisplayElement.appendChild(span);
    });
    quoteInputElement.value = null;
}

function startTimer() {
    timeLeft = parseInt(document.getElementById('time-limit').value);
    const totalTime = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft + 's';
        
        // Progress Bar
        progressBar.style.width = ((totalTime - timeLeft) / totalTime) * 100 + '%';

        // Live WPM
        const elapsed = totalTime - timeLeft;
        if (elapsed > 0) {
            wpmElement.innerText = Math.round((totalChars / 5) / (elapsed / 60));
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            quoteInputElement.disabled = true;
        }
    }, 1000);
}

quoteInputElement.addEventListener('input', () => {
    if (!isTyping) { 
        startTimer(); 
        isTyping = true; 
    }
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = 0;

    arrayQuote.forEach((span, i) => {
        if (arrayValue[i] == null) {
            span.classList.remove('correct', 'incorrect');
        } else if (arrayValue[i] === span.innerText) {
            span.classList.add('correct');
            correct++;
        } else {
            span.classList.add('incorrect');
        }
    });

    if (arrayValue.length === arrayQuote.length) {
        totalChars += arrayValue.length;
        renderNewQuote();
    }
    accuracyElement.innerText = arrayValue.length > 0 ? Math.round((correct / arrayValue.length) * 100) : 100;
});

document.getElementById('restart-btn').addEventListener('click', () => location.reload());

renderNewQuote();
