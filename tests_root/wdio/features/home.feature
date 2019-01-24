@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to navigate to the appropriate screen
  So that I can check if my account name or password have been compromised

  @S1 @manual
  Scenario: Verification on fields on screen
    Given The user loads the Beep web app homepage
    Then The user should see the Account button
    Then The user should see the Password button
    Then The user should see the How does it work link
