@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to be taken through appropriate screen
  so that I can Test Account and Password

@S1 @manual
Scenario: Verification of fields on screen
  Given User is on Web App Home screen
  When User opens https://beep.modus.app/#/
  Then User should see "Account field"
  Then User should see "Password field"
  Then User should see "How does it work"

@S2 @manual
Scenario: Verification of Validations on "Account field"
  Given User is on Home screen of Web App
  When User clicks on "Account field"
  Then User should be on https://beep.modus.app/#/acc Page
  Then User should see "Your username or email" text box
  Then User should see "Check" option

@S3 @manual
Scenario: Functionality of "Your username or email" text box
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  Then User should see a cursor
  Then User should be able to type

@S4 @manual
Scenario: Acceptance of data by"Your username or email" text box
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  Then User should be able to add User name
  Then User should be able to add Email ID

@S5.1 @manual
Scenario: Activation of "Check" option
   Given User clicks on "Account field"
  When User should see "check" option
  Then User should be on https://beep.modus.app/#/acc Page
  Then User should see deactivated "Check" option

@S5.2 @Manual
  Scenario: Activation of "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User doesn't type anything in "Your username or email" text box
  Then User should see deactivated "Check" option

@S5.3 @Manual
  Scenario: Activation of "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User adds spaces in  "Your username or email" text box
  Then User should see deactivated "Check" option


@S5.4 @Manual
  Scenario: Action when click on deactivated "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User adds spaces in  "Your username or email" text box
  Then User see deactivated "Check" option
  Then User clicks on "Check" Option
  Then User should "Check" option deactivated only
  Then User should see no validation and chnage for  "Your username or email" text box

@S5.5 @Manual
  Scenario: Action when click on deactivated "Check" option
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  Then User see deactivated "Check" option
  Then User clicks on "Check" Option
  Then User should "Check" option deactivated only
  Then User should see no validation and change for "Your username or email" text box

@S6.1 @manual
  Scenario: Verification of a non hacked Email ID
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User enters a non hacked Email ID
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/safe" Page
  Then User should see "Congratulations! Your account has not been compromised" message

@S6.2 @manual
  Scenario: Verification of a non hacked Username
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User enters a non hacked Username
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/safe" Page
  Then User should see "Congratulations! Your account has not been compromised" message

@S6.3 @manual
  Scenario: Verification of a hacked Email ID
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User enters a non hacked Email ID
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/breaches" Page
  Then User should display of websites from where it had been hacked

@S6.4 @manual
  Scenario: Verification of a hacked Username
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User enters a non hacked Username
  When User clicks on "Check" Option
  Then User should redirects to "https://beep.modus.app/#/breaches" Page
  Then User should display of websites from where it had been hacked

@S6.5 @manual
  Scenario: Verification of a invalid Email ID or Username
  Given User is on https://beep.modus.app/#/acc Page
  When User taps inside "Your username or email" text box
  When User enters a invalid Username or Email ID
  Then User should see a validation message

@S7 @manual
  Scenario: Verification on "back" button from Acc. Page
  Given User is on https://beep.modus.app/#/acc Page
  When User click on left back button
  Then User should redirects to Home screen 'https://beep.modus.app/#/" Page
