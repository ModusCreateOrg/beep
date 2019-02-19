@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to navigate to the appropriate screen
  So that I can check if my account name or password have been compromised

  @S1 @automated
  Scenario: The user can load the Beep homepage
    Given The user loads the Beep web app homepage
    Then The user should see the Account button
    Then The user should see the Password button
    Then The user should see the How does it work link
    Then The user should see the App Store link
    Then The user should see the Google Play link
