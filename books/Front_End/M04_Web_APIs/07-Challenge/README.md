# Project Overview
* ဒီ project လေးက Code Quiz လို့ခေါ်တဲ့ web application ဖြစ်ပြီး HTML, CSS, JavaScript အသုံးပြုပြီး လုပ်ထားပါတယ်။ ဒီ quiz က user ရဲ့ အတတ်ပညာကို မေးခွန်းတွေကနေ စမ်းသပ်ဖို့ ရည်ရွယ်ထားပါတယ်။ မေးခွန်းတွေကို အချိန်အကန့်အသတ်နဲ့ ဖြေဆိုရမှာဖြစ်ပြီး quiz ပြီးရင် score ကို သိမ်းဆည်းပြီး leaderboard မှာ ကြည့်ရှုနိုင်ပါတယ်။

## ဖိုင်များ
1. index.html - အဓိက web page ရဲ့ ဖွဲ့စည်းပုံပါဝင်ပါတယ်။
2. style.css - (သက်ဆိုင်တဲ့ CSS ဖိုင်) Web application ရဲ့ အလှဆင်မှုနဲ့ ပတ်သက်ပြီး ဖော်ပြထားပါတယ်။
3. script.js - JavaScript ဖိုင်ဖြစ်ပြီး quiz ရဲ့ logic တွေကို ကိုင်တွယ်ထားပါတယ်။
4. questions.js - (သက်ဆိုင်တဲ့ JavaScript ဖိုင်) မေးခွန်းတွေကို စုစည်းထားတဲ့ ဖိုင်ဖြစ်ပါတယ်။

### Features
* Start Quiz: "Start Quiz" ခလုတ်ကို နှိပ်ပြီး quiz ကို စတင်နိုင်ပါတယ်။
* Timed Quiz: User တွေက 60 စက္ကန့် အတွင်းမှာ မေးခွန်းတွေကို ဖြေဆိုရမှာ ဖြစ်ပါတယ်။
* Multiple-Choice Questions: မေးခွန်းတစ်ခုစီအတွက် စကားများကို ခလုတ်ကနေ ရွေးချယ်ရပါမယ်။
* Score Tracking: Quiz ပြီးချိန်မှာ time ပြန်သွားတဲ့အချိန်ကနေ score ကို ထုတ်ပေးပါတယ်။
* High Scores: User က သူ့ရဲ့ score ကို သူ့ရဲ့ initials နဲ့သိမ်းပြီး leaderboard မှာ ကြည့်ရှုနိုင်ပါတယ်။
* Restart Quiz: Quiz ပြီးရင် "Restart Quiz" ခလုတ်ကို နှိပ်ပြီး ပြန်စတင်နိုင်ပါတယ်။

# အသုံးပြုနည်း
1. Start Quiz:

* index.html ဖိုင်ကို browser မှာဖွင့်ပါ။
* "Start Quiz" ခလုတ်ကို နှိပ်ပါ။

2. မေးခွန်းတွေကို ဖြေဆိုခြင်း:

* မေးခွန်းကို ဖတ်ပြီး ချွေးစရာအဖြေတွေကို ခလုတ်ကနေ ရွေးပါ။
* မှားတဲ့အဖြေကို ရွေးမိရင် အချိန် ၁၀ စက္ကန့် ပြန်လျော့ပါမယ်။

3. Quiz ပြီးဆုံးခြင်း:

* မေးခွန်းအားလုံး ဖြေရင်မဖြစ်စေ၊ အချိန်ပြည့်သွားရင်မဖြစ်စေ quiz က ပြီးဆုံးမှာ ဖြစ်ပါတယ်။
* Quiz ပြီးရင် time အတော်ကြာတဲ့အချိန်အတိုင်း score ကို ပြပေးပါမယ်။

4. Score သိမ်းခြင်း:

* နာမည်ရဲ့ အကြီးအစ အနည်းဆုံး နှစ်လုံးကို ထည့်ပြီး "Submit Score" ခလုတ်ကို နှိပ်ပါ။
* Browser ရဲ့ local storage မှာ သင့်ရဲ့ score ကို သိမ်းပေးပါမယ်။

5. High Scores ကြည့်ရှုခြင်း:

* Score သိမ်းပြီးရင် high scores list ကို ပြပေးပါမယ်။
* "Restart Quiz" ခလုတ်ကို နှိပ်ပြီး ပြန်စတင်နိုင်ပါတယ်။

# Code ရှင်းပြချက်
1. HTML:

* Quiz ရဲ့ ဖွဲ့စည်းပုံအတွက် screen တွေကို ဖော်ပြထားပါတယ်၊ quiz စမယ့် screen, မေးခွန်းပြမယ့် screen, score ပြမယ့် screen တို့ပါဝင်ပါတယ်။

2. JavaScript (script.js):

* startGame(): Quiz ကို စတင်ပြီး မေးခွန်းတွေကို random လုပ်ကာစီစဉ်ပေးတယ်၊ timer ကို စပြီးစောင့်ကြည့်ပါတယ်။
* setNextQuestion(): နောက်ထပ်မေးခွန်းကို ပြပေးပါတယ်။
* selectAnswer(e): User ရဲ့ ရွေးချယ်မှုကို ကိုင်တွယ်ပြီး မှားရင် timer ကို လျော့ပေးပါတယ်။
* endGame(): Quiz ကို ပြီးစီးအောင်လုပ်ပြီး final score ကို ပြပေးတယ်။
* saveScore(): User ရဲ့ score ကို local storage မှာ သိမ်းပေးတယ်။
* showHighScores(): Local storage ထဲက high scores တွေကို ပြပေးတယ်။
* restartGame(): Quiz ကို ပြန်စလုပ်ဖို့ screen ပြန်ပြောင်းပေးတယ်။

# မေးခွန်းအသစ်ထည့်ခြင်း
* မေးခွန်းအသစ်ထည့်ချင်တယ်ဆိုရင် questions.js ဖိုင်ထဲမှာ questions array ထဲကို မေးခွန်း အသစ်တွေ ထည့်လို့ရပါတယ်။ question နဲ့ answers ဆိုတဲ့ field များကို အသစ်ထည့်လိုက်ရုံပါပဲ။

Local Development
Project ကို ပြင်ဆင်ချင်တယ်ဆိုရင်:

Repository ကို clone လုပ်ပါ သို့မဟုတ် download လုပ်ပါ။
Project ကို သင်နှစ်သက်တဲ့ code editor မှာ ဖွင့်ပါ။
index.html, style.css, သို့မဟုတ် script.js ကို လိုအပ်သလို ပြင်ဆင်ပါ။
index.html ကို web browser မှာ ဖွင့်ပြီး ပြင်ဆင်ချက်တွေကို ကြည့်ရှုပါ။
နောက်ဆုံးထောက်ခံချက်
ဒီ Code Quiz က HTML, CSS, JavaScript စတာတွေကို လေ့လာဖို့အတွက် အထောက်အကူပြုတဲ့ basic web application ဖြစ်ပါတယ်။ Web development ရဲ့ အခြေခံတွေကို လေ့လာရင်း interactive လည်းဖြစ်စေမှာပါ။