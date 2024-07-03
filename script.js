
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const sessionNumber = document.getElementById('sessionNumber').value;
    const rentalTime = parseInt(document.getElementById('rentalTime').value, 10);
    const endTime = new Date().getTime() + rentalTime * 60000;
    const sessionName = `Session ${sessionNumber}`;
    const existingSession = document.getElementById(`session-${sessionNumber}`);
    
    if (existingSession) {
        alert(`Session ${sessionNumber} is already in use.`);
        return;
    }

    const sessionElement = document.createElement('div');
    sessionElement.id = `session-${sessionNumber}`;
    sessionElement.innerHTML = `<h2>${sessionName}</h2><div id="countdown-${sessionNumber}"></div>`;
    document.getElementById('notifications').appendChild(sessionElement);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById(`countdown-${sessionNumber}`).innerHTML = `Time remaining: ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById(`countdown-${sessionNumber}`).innerHTML = "Time's up!";
            alert(`${sessionName} time has ended.`);
            const message = `جلسة ${sessionNumber} انتهى وقتهم`;
            const utterance = new SpeechSynthesisUtterance(message);
            speechSynthesis.speak(utterance);
        }
    }

    updateCountdown(); // Initial call to show the countdown immediately
    const countdownInterval = setInterval(updateCountdown, 1000);
});
