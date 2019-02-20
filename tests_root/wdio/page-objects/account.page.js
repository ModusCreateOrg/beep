/*global browser*/
const locators = {
  path: '/acc',

  usernameTextField: "//input[contains(@placeholder,'Username')]"
};

function getPath() {
  return locators.path;
}

function usernameTextField() {
  return browser.element(locators.usernameTextField);
}

export { getPath, usernameTextField }
