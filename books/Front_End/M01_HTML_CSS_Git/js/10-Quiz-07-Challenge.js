// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
  {
    question: "Hori seo n ကို ဘာလို့ span tag သုံးထားတာလဲ?",
    options: [
      "စာလုံးပေါင်းလေးလိုက်များကို သီးခြားခွဲစီထည့်ရန်", 
      "SEO ကို ထူးခြားစွာ ဖော်ပြရန်", 
      "အနီရောင် highlight လုပ်ရန်", 
      "စာလုံးအရွယ်အစားကို ပြောင်းရန်",],
    answer: "SEO ကို ထူးခြားစွာ ဖော်ပြရန်",
  },
 

  {
    question: "section class footer ထဲမှာရှိတဲ့ h2 heading က ဘာနဲ့ ဆက်နွယ်နေလဲ?",
    options: [ 
      "Web design များနှင့် ဆက်နွယ်တယ်", 
      "လုပ်ငန်းနှင့် ချစ်ခြင်းမေတ္တာအားဖြင့် ဖန်တီးမှု", 
      "Webpage ကို support ပြုလုပ်သူများ", 
      "SEO ထောက်ပံ့ပေးသူများ",],
    answer: "လုပ်ငန်းနှင့် ချစ်ခြင်းမေတ္တာအားဖြင့် ဖန်တီးမှု", 
  },

  {
    question: "Search Engine Optimization ကို ဘာအတွက် အသုံးပြုရသလဲ?",
    options: [ 
      "ဝဘ်ဆိုဒ်များကို offline အသုံးပြုရန်", 
      "သင့်စီးပွားရေးလုပ်ငန်းအတွက် ကောင်းမွန်သောဖောက်သည်များကို ရှာဖွေရန်", 
      "ဝဘ်ဆိုဒ်အတွင်း အခြားဝဘ်ဆိုဒ်များကို ချိတ်ဆက်ရန်", 
      "ဝဘ်ဆိုဒ်တစ်ခုလုံးကို ပြင်ဆင်ရန်",],
    answer: "သင့်စီးပွားရေးလုပ်ငန်းအတွက် ကောင်းမွန်သောဖောက်သည်များကို ရှာဖွေရန်", 
  },
  {
    question: "Social Media Marketing ဆိုသည်မှာ ဘာကြောင့် အရေးကြီးသလဲ?",
    options: [ 
      "လုပ်ငန်းများအတွက် စိတ်ဝင်စားမှုကို ဖော်ဆောင်ပေးနိုင်သောကြောင့်", 
      "လူမှုမီဒီယာပေါ်မှ အသုံးပြုသူများကို အချိန်မရွေး ပို့ခွင့်ရသောကြောင့်", 
      "လုပ်ငန်းများအတွက် စွမ်းဆောင်ရည်ပြည့်မြောက်စေသောကြောင့်", 
      "စွမ်းဆောင်ရည်ရှိသော ဖောက်သည်များကို ရှာဖွေရာ Analytics သုံးပြီး စျေးကွက်ကို ညှိနှိုင်းနိုင်သောကြောင့်", 
      ,],
    answer: "စွမ်းဆောင်ရည်ရှိသော ဖောက်သည်များကို ရှာဖွေရာ Analytics သုံးပြီး စျေးကွက်ကို ညှိနှိုင်းနိုင်သောကြောင့်", 
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
