// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
  { 
    question: "fightOrSkip function မှာ skip ကို ရွေးချယ်သွားရင် ဘာဖြစ်မှာလဲ?",
    options: [
      "Player ရဲ့ health ကို 5% လျော့တယ်", 
      "Player ရဲ့ health ကို 10% လျော့တယ်", 
      "Player ရဲ့ money ကို 10 လျော့ပြီး၊ battle မှထွက်သွားတယ်", 
      "Player ရဲ့ attack ကို 5 လျော့ပြီး၊ battle မှထွက်သွားတယ်",],
    answer: "Player ရဲ့ money ကို 10 လျော့ပြီး၊ battle မှထွက်သွားတယ်",
  },
  {
    question: "fight function ထဲမှာ isPlayerTurn ကို ဘာအတွက်အသုံးပြုတာလဲ?",
    options: [
      "Player က အရင်ဆုံးတိုက်ခိုက်ဖို့", 
      "Enemy က အရင်ဆုံးတိုက်ခိုက်ဖို့", 
      "Random ဖော်မြူလာနဲ့ turn order ကိုဆုံးဖြတ်ဖို့", 
      "Player နဲ့ Enemy အပြန်အလှန်တိုက်ခိုက်ဖို့"],
    answer: "Random ဖော်မြူလာနဲ့ turn order ကိုဆုံးဖြတ်ဖို့",
  },
  
  {
    question:"shop function မှာ number 1 ကို ရွေးချယ်မယ်ဆိုရင် ဘာဖြစ်မယ်လဲ?",
    options: [ 
      "Attack ကို 10 တိုးပေး", 
      "Health ကို 10 တိုးပေး", 
      "Health ကို 20 တိုးပေး", 
      "Money ကို 10 တိုးပေး",],
    answer: "Health ကို 20 တိုးပေး",
  },

  {
    question: "localStorage ကို endGame function မှာ ဘာအတွက်အသုံးပြုတာလဲ?",
    options: [ " Player ရဲ့ current money ကို သိမ်းဆည်းဖို့", 
      "Player ရဲ့ high score ကို သိမ်းဆည်းဖို့",
      "Player ရဲ့ game data တွေကိုပြန် save လုပ်ဖို့",
      "Player ရဲ့ health ကိုပြန်သိမ်းဆည်းဖို့",],
    answer: "Player ရဲ့ high score ကို သိမ်းဆည်းဖို့",
  },

  {
    question: "getPlayerName function ဟာ ဘာလုပ်ပေးသလဲ?",
    options: [ "Player ရဲ့ robot အမည်ကို prompt box ထဲမှာရိုက်ထည့်", 
      "Player ရဲ့ robot health ကိုပြန်ထည့်",
      "Player ရဲ့ robot attack ကိုထည့်",
      "Player ရဲ့ robot အမည်ကို math.random နဲ့ရွေးချယ်",],
    answer: "Player ရဲ့ robot အမည်ကို prompt box ထဲမှာရိုက်ထည့်",
  },

];

// Function to start the quiz
function startQuiz() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter your name.");
    return;
  }

  // Hide the start screen and show the quiz screen
  document.getElementById("start-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  // Shuffle the questions to randomize the quiz
  questions = shuffleArray(questions);

  // Display the first question
  displayQuestion();

  // Start the timer
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const questionContainer = document.getElementById("question");

  // Get the current question and its options
  const questionText = questions[currentQuestion].question;
  const options = questions[currentQuestion].options;

  // Create the HTML for the question and options
  const questionHtml = `
        <div class="question-number">Question ${currentQuestion + 1}:</div>
        <div class="question-text">${questionText}</div>
        <div class="options">
            ${options.map((option) => createOption(option)).join("")}
        </div>
    `;

  // Set the HTML inside the question container
  questionContainer.innerHTML = questionHtml;

  // Show the "Next" button after the question is displayed
  document.getElementById("next-question").style.display = "block";
}

// Function to create the HTML for an option
function createOption(option) {
  return `
        <div class="option">
            <input type="radio" name="answer" value="${option}"> ${option}
        </div>`;
}

// Function to start the countdown timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
    } else {
      clearInterval(timer);
      document.getElementById("time").textContent = "Time's up!";
      disableOptions();
      setTimeout(nextQuestion, 2000);
    }
  }, 1000);
}

// Function to check the selected answer
function checkAnswer() {
  clearInterval(timer); // Stop the timer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked'); //option was already created, but added checked there for this answer
  const feedback = document.getElementById("feedback");

  if (!selectedAnswer) {
    feedback.textContent = "Please select an answer!";
    return;
  }

  const answer = selectedAnswer.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${questions[currentQuestion].answer}.`;
  }

  disableOptions();
  setTimeout(nextQuestion, 1000); // Move to the next question after a short delay
}

// Function to disable all options (used after the answer is selected or time runs out)
function disableOptions() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true;
  });
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    timeLeft = 25; // Reset the timer
    displayQuestion(); // Show the next question
    startTimer(); // Start the timer again
    document.getElementById("feedback").textContent = "";
  } else {
    showResult(); // Show the result if the quiz is finished
  }
}

// Function to show the final result
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const username = document.getElementById("username").value;
  const percentage = (score / questions.length) * 100;

  let resultText;
  if (percentage >= 50) {
    resultText = `<span class="pass">You Pass!</span>`;
  } else {
    resultText = `<span class="fail">You Fail!</span>`;
  }

  document.getElementById("result").innerHTML = `
        ${username}, you scored ${score} out of ${questions.length}!<br>${resultText}`;
}

// Function to restart the quiz
function testAgain() {
  currentQuestion = 0;
  timeLeft = 25;
  score = 0;
  questions = shuffleArray(questions);

  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  displayQuestion();
  startTimer();
}

// Function to shuffle an array (used to randomize questions and options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
