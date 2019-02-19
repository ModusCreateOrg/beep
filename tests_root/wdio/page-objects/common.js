/*global browser*/
const locators = {
  checkButton: "//ion-button[span[text()='Check']]"
};

function checkButton() {
  return browser.element(locators.checkButton);
}

export default checkButton;
