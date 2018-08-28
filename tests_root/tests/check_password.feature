@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to be taken through appropriate screen
  so that I can Test Account and Password

@S8 @manual
Scenario: Verification "password field"
  Given User is on Home screen of Web App
  When User clicks on "password field"
  Then User should be on https://beep.modus.app/pwd Page
  Then User should see "Your password" text box
  Then User should see "Check" option

@S9 @manual
Scenario: Activation of "Check" option without data
   Given User is on "https://beep.modus.app"
   Given User clicks on "Password field"
  When User should see "check" option
  Then User should be on https://beep.modus.app/pwd Page
  Then User should see deactivated "Check" option

@S9.1 @Manual
  Scenario: Activation of "Check" option with space
  Given User is on https://beep.modus.app/pwd Page
  When User taps inside "Your password" text box
  When User adds spaces in "Your password" text box
  Then User should see deactivated "Check" option

@S9.2 @Manual
  Scenario: Action when click on deactivated "Check" option
  Given User is on https://beep.modus.app/pwd Page
  When User taps inside "Your password" text box
  When User adds spaces in  "Your password" text box
  Then User see deactivated "Check" option
  Then User clicks on "Check" Option
  Then User should "Check" option deactivated only
  Then User should see no validation and change for "Your password" text box

@S9.3 @Manual
  Scenario: Action when click on deactivated "Check" option
  Given User is on https://beep.modus.app/pwd Page
  When User taps inside "Your password" text box
  Then User see deactivated "Check" option
  Then User clicks on "Check" Option
  Then User should "Check" option deactivated only
  Then User should see no validation and change for "Your password" text box

@S9.4 @manual
  Scenario: Verification of a non hacked Password
  Given User is on https://beep.modus.app/pwd Page
  When User taps inside "Your password" text box
  When User enters a non hacked Email ID
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/safe" Page
  Then User should see "Congratulations! Your password has not been compromised" message

@S9.5 @manual
  Scenario: Verification of a hacked Password
  Given User is on https://beep.modus.app/pwd Page
  When User taps inside "Your password" text box
  When User enters a non hacked Email ID
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/breaches" Page
  Then User should display of websites from where it had been hacked

@S7 @manual
  Scenario: Verification on "back" button from Acc. Page
  Given User is on "https://beep.modus.app/pwd" Page
  When User click on left back button
  Then User should redirects to Home screen 'https://beep.modus.app/#/" Page
