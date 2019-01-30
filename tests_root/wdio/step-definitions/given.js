/*global browser*/
import { Given } from 'cucumber'
import { getPath, logo } from '../page-objects/home.page'
import expect from 'expect'

Given(/^The user loads the Beep web app homepage$/, { wrapperOptions: { retry: 2 } }, () => {
  browser.url(getPath())
  expect(logo().value).toBeTruthy()
})
