let isLoggedIn = false;

function startLearning() {
  window.location.href = "#courses";
}

function openChallenge() {
  document.getElementById("challengeModal").classList.remove("hidden");
  document.getElementById("resultMsg").textContent = '';
  document.getElementById("userAnswer").value = '';
}

function closeChallenge() {
  document.getElementById("challengeModal").classList.add("hidden");
}

function checkAnswer() {
  const answer = parseInt(document.getElementById("userAnswer").value);
  const result = document.getElementById("resultMsg");

  if (answer === 42) {
    if (isLoggedIn) {
      result.textContent = "Pareizi! 🎉 Tu ieguvi 50 XP!";
      result.style.color = "green";
    } else {
      closeChallenge();
      openLoginPrompt();
    }
  } else {
    result.textContent = "Nepareizi. Pamēģini vēlreiz!";
    result.style.color = "red";
  }
}

function openLoginPrompt() {
  document.getElementById("loginPrompt").classList.remove("hidden");
}

function closeLoginPrompt() {
  document.getElementById("loginPrompt").classList.add("hidden");
}

function simulateLogin() {
  isLoggedIn = true;
  closeLoginPrompt();
  alert("Tu esi veiksmīgi ielogojies! Tagad Tu vari saņemt XP.");
}