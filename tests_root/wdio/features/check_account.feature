@Account_Screen
Feature: Account screen of Beep web app
  As a user of Beep web app
  I want to be able to provide my username on the Account page
  So that I know if my account data has been compromised

  @S1 @automated
  Scenario: The user can navigate to the Account page
    Given The user loads the Beep web app homepage
    When The user selects the Account button
    Then The user should be on the Account page
    Then The user should see the Your username or email text field
    Then The user should see the Check button

  @S2 @manual
  Scenario: Functionality of "Your username or email" text box
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    Then User should see a cursor
    Then User should be able to type

  @S3 @manual
  Scenario: Acceptance of data by"Your username or email" text box
    Given User is on https://beep.modus.app/acc Page
    When User taps inside "Your username or email" text box
    Then User should be able to add User name
    Then User should be able to add Email ID

  @S4.1 @manual
  Scenario: Activation of "Check" option
    Given User is on "https://beep.modus.app"
    Given User clicks on "Account field"
    When User should see "check" option
    Then User should be on https://beep.modus.app/acc Page
    Then User should see deactivated "Check" option

  @S4.2 @Manual
  Scenario: Activation of "Check" option
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User doesn't type anything in "Your username or email" text box
    Then User should see deactivated "Check" option

  @S4.3 @Manual
  Scenario: Activation of "Check" option
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User adds spaces in  "Your username or email" text box
    Then User should see deactivated "Check" option


  @S4.4 @Manual
  Scenario: Action when click on deactivated "Check" option
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User adds spaces in  "Your username or email" text box
    Then User see deactivated "Check" option
    Then User clicks on "Check" Option
    Then User should "Check" option deactivated only
    Then User should see no validation and change for "Your username or email" text box

  @S4.5 @Manual
  Scenario: Action when click on deactivated "Check" option
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    Then User see deactivated "Check" option
    Then User clicks on "Check" Option
    Then User should "Check" option deactivated only
    Then User should see no validation and change for "Your username or email" text box

  @S5.1 @manual
  Scenario: Verification of a non hacked Email ID
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User enters a non hacked Email ID
    When User clicks on "Check" Option
    Then User should redirects to "https://beep.modus.app/#/safe" Page
    Then User should see "Congratulations! Your account has not been compromised" message

  @S5.2 @manual
  Scenario: Verification of a non hacked Username
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User enters a non hacked Username
    When User clicks on "Check" Option
    Then User should redirects to "https://beep.modus.app/#/safe" Page
    Then User should see "Congratulations! Your account has not been compromised" message

  @S5.3 @manual
  Scenario: Verification of a hacked Email ID
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User enters a non hacked Email ID
    When User clicks on "Check" Option
    Then User should redirects to "https://beep.modus.app/#/breaches" Page
    Then User should display of websites from where it had been hacked

  @S5.4 @manual
  Scenario: Verification of a hacked Username
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User enters a non hacked Username
    When User clicks on "Check" Option
    Then User should redirects to "https://beep.modus.app/#/breaches" Page
    Then User should display of websites from where it had been hacked

  @S5.5 @manual
  Scenario: Verification of a invalid Email ID or Username
    Given User is on https://beep.modus.app/#/acc Page
    When User taps inside "Your username or email" text box
    When User enters a invalid Username or Email ID
    Then User should see a validation message

  @S6 @manual
  Scenario: Verification on "back" button from Acc. Page
    Given User is on "https://beep.modus.app" Page
    When User click on left back button
    Then User should redirects to Home screen 'https://beep.modus.app/#/" Page
