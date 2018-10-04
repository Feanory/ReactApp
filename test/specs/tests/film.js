let assert = require('assert');
let Login = require('./../pages/login.page');

let loginPage = new Login();

beforeEach(() => {
  browser.url('/');
})

describe('film page', () => {

  it('should accept login', () => {
    loginPage.login();  
  })

  it('should navigate to films-list page', () => {
    browser.pause(1000);
    browser.isExisting('div[class="main-container"]');
  })

  it('should navigate to film page', () => {
    browser.pause(1000);

    // click the first film link
    let filmsLinks = $$('div[class="item"] a');
    filmsLinks[0].click()

    browser.pause(2000);
    
    browser.isExisting('div[class="film-container"]');
    
    // set 8 rating stars
    let ratingStars = $$('div[class="ui star rating"] i');
    ratingStars[7].click();

    // check active stars length
    let activeStars = $$('i[class="active icon"]');
    assert(activeStars.length === 8);

    // check unactive stars length
    let unActiveStars = $$('i[class="icon"]');
    assert(unActiveStars.length === 2);

  })
})