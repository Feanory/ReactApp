let assert = require('assert');
let Login = require('./../pages/login.page');

let loginPage = new Login();

beforeEach(() => {
  browser.url('/');
})

describe('logout page', () => {
  it('should accept login', () => {
    loginPage.login();  
  })

  it('should navigate to login page', () => {
    let logoutButton = $('a[class="logout-button"]');
    logoutButton.click();

    browser.pause(1000);
    browser.isExisting('div[class="column login-form-container"]');
  });
})