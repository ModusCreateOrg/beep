const locators = {
  accountButton: "//div[text()='Account']",
  howDoesItWorkLink: "//span[text()='How does it work?']",
  logo: "//img[contains(@src,'Beep-Logo')]",
  path: '/',
  passwordButton: "//div[text()='Password']"
};

function getPath() {
  return locators.path;
};

function accountButton() {
  return browser.element(locators.accountButton);
};

function howDoesItWorkLink() {
  return browser.element(locators.howDoesItWorkLink);
};

function logo() {
  return browser.element(locators.logo);
}

function passwordButton() {
  return browser.element(locators.passwordButton);
};

function clickAccountButton() {
  accountButton().click();
};

function clickPasswordButton() {
  passwordButton().click();
};

export {
  accountButton,
  getPath,
  howDoesItWorkLink,
  logo,
  passwordButton
};
