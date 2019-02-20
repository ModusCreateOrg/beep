/*global browser*/
const locators = {
  accountButton: "//div[text()='Account']",
  appStoreLink: "//a[contains(@href,'/beepios')]",
  googlePlayLink: "//a[contains(@href,'/beepandroid')]",
  howDoesItWorkLink: "//span[text()='How does it work?']",
  logo: "//img[contains(@src,'Beep-Logo')]",
  path: '/',
  passwordButton: "//div[text()='Password']",
}

function getPath() {
  return locators.path
}

function accountButton() {
  return browser.element(locators.accountButton)
}

function appStoreLink() {
  return browser.element(locators.appStoreLink);
}

function googlePlayLink() {
  return browser.element(locators.googlePlayLink);
}

function howDoesItWorkLink() {
  return browser.element(locators.howDoesItWorkLink)
}

function logo() {
  return browser.element(locators.logo)
}

function passwordButton() {
  return browser.element(locators.passwordButton)
}

function clickAccountButton() {
  accountButton().click()
}

function clickPasswordButton() {
  passwordButton().click()
}

export {
  accountButton,
  appStoreLink,
  clickAccountButton,
  clickPasswordButton,
  getPath,
  googlePlayLink,
  howDoesItWorkLink,
  logo,
  passwordButton
}
