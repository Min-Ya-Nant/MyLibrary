// Initial variables to keep track of quiz progress
let currentQuestion = 0;
let timeLeft = 25;
let timer;
let score = 0;

// Example questions array
let questions = [
  {
    question: "ဒီ HTML စာမျက်နှာထဲမှာ header tag ရဲ့ ရည်ရွယ်ချက်က ဘာလဲ? ?",
    options: ["ဝဘ်စာမျက်နှာရဲ့ အဓိကအကြောင်းအရာကို ဖော်ပြရန်",
       "ဝဘ်စာမျက်နှာအတွက် metadata များကို ထည့်သွင်းရန်", 
       "ဝဘ်စာမျက်နှာအတွက် အမူအရာ မိတ်ဆက်စာပေများ သို့မဟုတ် navigation လင့်များကို ဖော်ပြရန်", 
       "CSS ရဲ့ စတိုင်များကို သတ်မှတ်ထားသော နေရာ",],
    answer: "ဝဘ်စာမျက်နှာအတွက် အမူအရာ မိတ်ဆက်စာပေများ သို့မဟုတ် navigation လင့်များကို ဖော်ပြရန်",
  },
 

  {
    question: "CSS positioning တွင် relative နဲ့ absolute position တို့ရဲ့ အဓိကကွာခြားချက်က ဘာလဲ??",
    options: [ "relative positioning က မူရင်းနေနေရာကို အခြေခံထားပြီး၊ absolute positioning က အနီးဆုံး positioned ancestor ကို အခြေခံပြီး ပေါ်လာသည်။", 
      "absolute positioning က အခြား element များ၏ layout ကို မထိခိုက်ဘဲ ရှိနေပြီး၊ relative positioning က ထိခိုက်စေသည်။", 
      "absolute positioning က element ကို စာမျက်နှာအပေါ်ထိ တင်ပြီး၊ relative က အောက်ထိ ရွှေ့သည်။", 
      "relative positioning က element ကို မူလ document flow မှ ထုတ်ပစ်ပြီး၊ absolute positioning က document flow ထဲမှာပဲ ရှိနေသည်။",],
    answer: "relative positioning က မူရင်းနေနေရာကို အခြေခံထားပြီး၊ absolute positioning က အနီးဆုံး positioned ancestor ကို အခြေခံပြီး ပေါ်လာသည်။", 
  },

  {
    question: "ပထမ section ထဲရှိ div element အတွက် container class ရဲ့ အရေးပါမှုက ဘာလဲ?? ",
    options: [ "ပုံတွေကို ဖျောက်ရန်ဖြစ်သည်။", 
      "ပုံတွေကို တစ်ပြိုင်နက်တည်း ပေါ်တင်ဖော်ပြရန်ဖြစ်သည်။", 
      "ပုံတွေကို အစုလိုက်အစုလိုက် စုပေါင်းပြီး၊ positioning စတိုင်များကို ထည့်သွင်းရန်ဖြစ်သည်။", 
      "ဒုတိယပုံကို မူလအတိုင်း ဖျောက်ထားသည်။",],
    answer: "ပုံတွေကို အစုလိုက်အစုလိုက် စုပေါင်းပြီး၊ positioning စတိုင်များကို ထည့်သွင်းရန်ဖြစ်သည်။", 
  },
  {
    question: "ဒီ HTML စာမျက်နှာအတွင်းရှိ img tag တွင် src attributes များဟာ ဘာကို ညွှန်းဆိုထားတာလဲ? ",
    options: [ "အခြားဝဘ်ဆိုဒ်များကို ချိတ်ဆက်ထားသည်။", 
      "လက်ရှိဖိုင်နှင့် အနီးဆုံးရှိ images folder ထဲရှိ ပုံများကို ညွှန်းထားသည်။", 
      "ပုံပျောက်နေပါက alt text ကို ဖော်ပြသည်။", 
      "စာမျက်နှာရဲ့ နောက်ခံအရောင်ကို ပြောင်းလဲသည်။", 
      ],
    answer: "လက်ရှိဖိုင်နှင့် အနီးဆုံးရှိ images folder ထဲရှိ ပုံများကို ညွှန်းထားသည်။", 
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
