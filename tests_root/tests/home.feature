@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to be taken through appropriate screen
  so that I can Test Account and Password

@S1 @manual
Scenario: Verification on fields on screen
  Given User is on Web App Home screen
  When User opens https://beep.modus.app/#/
  Then User should see "Account Field"
  Then User should see "Password Field"
  Then User should see "How does it work"


@S2 @manual
Scenario: Verification of Validations on "Account Field"
  Given User is on Home screen of Web App
  When User clicks on "Account Field"
  Then User should be on https://beep.modus.app/#/acc Page
  Then User should see "Your username or email" text box
  Then User should see "Check" option


@S3 @manual
Scenario: Functionality of "Your username or email" text box
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  Then User should see a cursor
  Then User should be able to type

@S3 @manual
Scenario: Acceptence of data by"Your username or email" text box
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  Then User should be able to add User name
  Then User should be able to add Email ID

@S4 @manual
Scenario: Activation of "Check" option
   Given User clicks on "Account Field"
  When User should see "check" option
  Then User should be on https://beep.modus.app/#/acc Page
  Then User should see deactivated "Check" option

@S4 @Manual
  Scenario: Activation of "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User doesn't type anything in "Your username or email" text box
  Then User should see deactivated "Check" option

@S4 @Manual
  Scenario: Activation of "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User adds spaces in  "Your username or email" text box
  Then User should see deactivated "Check" option
