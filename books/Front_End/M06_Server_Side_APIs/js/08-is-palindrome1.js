var expect = chai.expect;

describe('isPalindrome', function() {
  it('takes a string and returns true if the string is a palindrome စာကြောင်းတစ်ကြောင်းကို ယူပြီး စာကြောင်းဟာ ပလင်ဒရိုမ် (palindrome) ဖြစ်ပါက true ပြန်ပေးသည်။', function() {
    var str = 'radar';

    var result = isPalindrome(str);

    expect(result).to.eql(true);
  });

  it('takes a string and returns false if the string is not a palindrome စာကြောင်းတစ်ကြောင်းကို ယူပြီး စာကြောင်းဟာ ပလင်ဒရိုမ် မဟုတ်ပါက false ပြန်ပေးသည်။', function() {
    var str = 'engage';

    var result = isPalindrome(str);

    expect(result).to.eql(false);
  });
});
