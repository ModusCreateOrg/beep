import { Then } from 'cucumber'
import * as homePage from '../page-objects/home.page'
import expect from 'expect'
import * as accountPage from '../page-objects/account.page'
import checkButton from '../page-objects/common'
import * as passwordPage from '../page-objects/password.page'

Then(
  /^The user should see the (Account button|Password button|How does it work link|App Store link|Google Play link)$/,
  { wrapperOptions: { retry: 2 } },
  pageElement => {
    let element;
    switch (pageElement) {
      case "Account button": {
        element = homePage.accountButton();
        break;
      }
      case "Password button": {
        element = homePage.passwordButton();
        break;
      }
      case "How does it work link": {
        element = homePage.howDoesItWorkLink();
        break;
      }
      case "App Store link": {
        element = homePage.appStoreLink();
        break;
      }
      case "Google Play link": {
        element = homePage.googlePlayLink();
        break;
      }
      default: {
        throw new Error('The element does not exist on the home page.')
      }
    }

    expect(element.value).toBeTruthy();
  }
)

Then(/^The user should be on the (Account|Password) page$/, { wrapperOptions: { retry: 2 } }, pagePath => {
  let path;
  switch (pagePath) {
    case "Account": {
      path = accountPage.getPath();
      break;
    }
    case "Password": {
      path = passwordPage.getPath();
      break;
    }
    default: {
      throw new Error('The requested page does not exist.');
    }
  }

  expect(browser.getUrl()).toContain(path);
})

Then(/^The user should see the (Your username or email text field|Your password text field|Check button)$/, { wrapperOptions: { retry: 2 } }, pageElement => {
  let element;
  switch (pageElement) {
    case "Your username or email text field": {
      element = accountPage.usernameTextField();
      break;
    }
    case "Your password text field": {
      element = passwordPage.passwordTextField();
      break;
    }
    case "Check button": {
      element = checkButton();
      break;
    }
    default: {
      throw new Error('The element does not exist on the account page.')
    }
  }

  expect(element.value).toBeTruthy();
})
