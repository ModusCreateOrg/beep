/*global browser*/
const locators = {
  path: '/pwd',

  passwordTextField: "//input[@type='password']"
};

function getPath() {
  return locators.path;
}

function passwordTextField() {
  return browser.element(locators.passwordTextField);
}

export { getPath, passwordTextField }
