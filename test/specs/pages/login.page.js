"use strict";

class Login {
  constructor() {}

  login() {
    browser.setValue('#apiKey', '17e65ecee926a53f4ad4ddd26a472d56');
    browser.submitForm('#formApi');
    browser.pause(1000);

    browser.click('.login');
    browser.pause(500);
    
    browser.setValue('#username', 'denylesko');
    browser.setValue('#password', 'denys1996232');


    browser.pause(500);
    browser.click('input[class="right center"]');

    browser.pause(500);
    browser.click('button[id="allow_authentication"]');

    browser.pause(1000);
    browser.isExisting('div[class="ui items"]');
  }

}

module.exports = Login;