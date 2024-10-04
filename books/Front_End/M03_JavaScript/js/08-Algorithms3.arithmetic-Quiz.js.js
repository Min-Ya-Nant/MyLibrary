// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
  { 
    question: " before function ရဲ့ အလုပ်လုပ်ပုံကဘာလဲ?",
    options: [
      "Testing မလုပ်ခင်အချိန်မှာ console.log ကို override လုပ်ပြီး values တွေကိုသိမ်းထားပေးတာ", 
      "Testing ပြီးရင် console.log ကို ပြန်သုံးနိုင်အောင်လုပ်ပေးတာ", 
      "Testing မှာ error ဖြစ်မဖြစ် စမ်းသပ်တာ", 
      "console.log ကို မဖျက်ပဲ override လုပ်တာ",],
    answer: "Testing မလုပ်ခင်အချိန်မှာ console.log ကို override လုပ်ပြီး values တွေကိုသိမ်းထားပေးတာ",
  },
  {
    question: "describe function ကဘာလုပ်ပေးသလဲ?",
    options: [
      "Function ရဲ့ မူဝါဒကို ရေးပေးတယ်", 
      "Function ရဲ့ test case တွေကို ဖန်တီးပေးတယ်", 
      "Function ရဲ့ result ကို ပြောပြတယ်", 
      "Function ရဲ့ output ကို console.log ထဲမှာပြပေးတယ်"],
    answer: "Function ရဲ့ test case တွေကို ဖန်တီးပေးတယ်",
  },
  
  {
    question:"expect(console.log.calledWith()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); ကဘာကိုစမ်းသပ်ပေးသလဲ?",
    options: [ 
      "console.log က နံပါတ် 1 ကနေ 10 ထိကိုတိတိကျကျ ဖော်ပြနေမယ့် စမ်းသပ်ချက်", 
      "onsole.log က နံပါတ်တွေကို random ပြောပြနေမယ့်စမ်းသပ်ချက်", 
      " console.log က console.error လို့ရိုက်ထုတ်နေမယ့်စမ်းသပ်ချက်", 
      "console.log ကိုပြန်စမ်းထားတာ",],
    answer: "console.log က နံပါတ် 1 ကနေ 10 ထိကိုတိတိကျကျ ဖော်ပြနေမယ့် စမ်းသပ်ချက်",
  },

  {
    question: "console.log.calledWith() ဆိုတာဘာကို လုပ်ပေးသလဲ?",
    options: [ "console.log က return လုပ်နေတဲ့ values တွေကို ပြန်လည်ဖော်ပြ", 
      "console.log ဟာ test case တစ်ခုခု run ပြီးမှ values တွေကို ပြန်ရောက်",
      "console.log ဟာ လုပ်နေတဲ့ function များကိုရှာပေး",
      "console.log က error message ကိုပေး",],
    answer: "console.log က return လုပ်နေတဲ့ values တွေကို ပြန်လည်ဖော်ပြ",
  },

  {
    question: "logNums function ကဘာလုပ်ပေးသလဲ?",
    options: [ "console.log မှာ 1 ကနေ num ထိ log လုပ်ပေး", 
      "console.error မှာ numbers တွေထုတ်ပေး",
      "string တွေကို log ပြီး ပြန်လည်ပေး",
      "random number တွေကို console.log ထဲမှာထုတ်ပေး",],
    answer: "console.log မှာ 1 ကနေ num ထိ log လုပ်ပေး",
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
