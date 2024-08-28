var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');

var message =
  'ကမ္ဘာ မီးလောင် သားကောင် ချနင်း ဆိုတဲ့ စကားအတိုင်း မြန်မာနိုင်ငံမှာ ဖြစ်ပွားနေတဲ့ ပြည်တွင်းစစ်မှာ ပြည်သူတစ်ရပ်လုံးဟာ စစ်မီးလျံကြားမှာ သားကောင်တွေအဖြစ် ချနင်းခံနေကြရပါတယ်။';
var words = message.split(' ');
 // Timer that counts down from 5
function countdown() {
  var timeLeft = 5;

  // TODO: Add a comment describing the functionality of the setInterval() method:
   // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // TODO: Add comments describing the functionality of the `if` statement:
 // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) { // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } // TODO: Add comments describing the functionality of the `else if` statement: // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';  
      // Decrement `timeLeft` by 1
      timeLeft--;
    } // TODO: Add comments describing the functionality of the `else` statement:
    else { 
       // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (words[wordCount] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

countdown();
