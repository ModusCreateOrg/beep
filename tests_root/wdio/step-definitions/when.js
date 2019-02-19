/*global browser*/
import { When } from 'cucumber'
import { clickAccountButton, clickPasswordButton } from '../page-objects/home.page'

When(/^The user selects the (Account|Password) button$/, { wrapperOptions: { retry: 2 } }, pageElement => {
  switch (pageElement) {
    case "Account": {
      clickAccountButton();
      break;
    }
    case "Password": {
      clickPasswordButton();
      break;
    }
    default: {
      throw new Error('The element was not found on the homepage.');
    }
  }
})
