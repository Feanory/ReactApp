let assert = require('assert');
let Login = require('./../pages/login.page');

beforeEach(() => {
    browser.url('/');
})

describe('submit form', () => {
    let loginPage = new Login();

    it('navigate to login page', () => {
        let text = browser.getText('.header=Example apiKey');
        assert.equal(text, 'Example apiKey')
    });

    it('valid form', () => {
        browser.setValue('#apiKey', '');
        browser.submitForm('#formApi')
        let errorMessage = browser.getHTML('.negative');
        assert(errorMessage);
    })

    it('should get allow', () => {
        loginPage.login()
    })

    it('should navigate to films page', () => {
        browser.pause(1000);
        
        browser.isExisting('div[class="ui items"]');
    })
})
