@Password_Screen
Feature: Password screen of Beep web app
  As a user of Beep web app
  I want to be able to provide my password on the Password page
  So that I know if my account data has been compromised

  @S1 @automated
  Scenario: The user can navigate to the Password page
    Given The user loads the Beep web app homepage
    When The user selects the Password button
    Then The user should be on the Password page
    Then The user should see the Your password text field
    Then The user should see the Check button
