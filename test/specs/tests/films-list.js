let assert = require('assert');
let Login = require('./../pages/login.page');

let loginPage = new Login();

beforeEach(() => {
  browser.url('/');
})

describe('films list page', () => {
  it('should accept login', () => {
    loginPage.login();  
  })

  it('should navigate to films-list page', () => {
    browser.pause(1000);
    browser.isExisting('div[class="ui items"]');
  })

  it('toggle between popular and upcoming', () => {
    browser.pause(1000);
    let upcoming = $('button[class="ui button upcoming"]')
    upcoming.click();

    browser.pause(1000);
    browser.isExisting('button[class="ui active button upcoming"]');
  })

  it('should exist infinity scroll', () => {
    const films = $$('div[class="item"]');

    browser.moveToObject(`//div/div/div[2]/div/div/div[1]/div[${films.length - 1}]`);
    browser.pause(1000);

    const newFilms = $$('div[class="item"]');
    assert(newFilms.length > films.length);
  })
})