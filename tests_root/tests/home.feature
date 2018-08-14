@Home_Screen
Feature: Home Screen of Beep Web App
  As a User
  I want to be taken through appropriate screen
  so that I can Test Account and Password

@S1 @manual
Scenario: Verification on fields on screen
  Given User is on Web App Home screen
  When User opens https://beep.modus.app/#/
  Then User should see "Account field"
  Then User should see "Password field"
  Then User should see "How does it work"
