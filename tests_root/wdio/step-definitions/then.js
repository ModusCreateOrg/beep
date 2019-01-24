import { Then } from 'cucumber';
import {
  accountButton,
  howDoesItWorkLink,
  passwordButton
} from '../page-objects/home.page';
import expect from 'expect';

Then(
      /^The user should see the (Account button|Password button|How does it work link)$/,
      { wrapperOptions: { retry: 2 } },
      pageElement => {
        let element;
        if(pageElement === 'Account button') {
          element = accountButton();
        } else if(pageElement === 'Password button') {
          element = passwordButton();
        } else if(pageElement === 'How does it work link') {
          element = howDoesItWorkLink();
        } else {
          throw new Error('The element does not exist on the home page.');
        }

        expect(element.value).toBeTruthy();
      }
);
