Feature: Enter my activity report

In order to be paid
As a consultant
I want to enter my activity report

Background:
  Given I have navigated to the create page

Scenario Outline: I can see a message telling me the constraint of a field
  When I fill in my information in the form without respecting all the constraints
  Then I can see a message telling me the constraint not met

Scenario: I can validate my inputs
  Given I have filed the "Consultant", "Mission" and "Journées d'intervention" forms
  When I click on "Valider mon CRA" button
  Then a success message appears
  And the links appears excepte the invoice one

Scenario: I made a mistake filling the form and I try to validate it
  When I click on "Valider mon CRA" button
  And I have not filled-out the form correctly
  Then a fail notification appears
  And an error message appears near the input
  And my inputs aren't validated

Scenario: I change the value of an input after a form validation
  When I validated the form
  But I change the value of an input
  Then the Links and success notification are hidden
  And I have to validate the form

Scenario Outline: I can select the month I worked
  Given the selected month is January 2019
  And I have selected the first day
  When I click the <action> button
  Then the selected month should be <month>
  And the days selection should have been emptied

  Exemples:
    | action   | month         |
    | next     | Feburay 2019  |
    | previous | December 2018 |

Scenario: I can indicate how many days I worked in the month
  When I select the days I worked
  Then the "Nombre total de journées :" should be updated as well

Scenario: I want delete a worked day on the calendar
  Given I selected one day
  When I click on this day box
  Then this day is reset
  And the days selection should have been updated

Scenario: I want to display working time options for a day
  Given I have selected a day
  When I hover on the blue pastille
  Then new choice appears

Scenario: I select half a day as the working time for a day
  Given I have displayed time options for a day
  When I click on half a day
  Then The blue pastille show "0,5 jour"
  And the days selection should have been updated

Scenario: I select zero as the working time for a day
  Given I have displayed time options for a day
  When I click on zero
  Then this day is reset
  And the days selection should have been updated

Scenario: I can go back to the homepage
  When I click the Logo
  Then I should go to the "homepage"
