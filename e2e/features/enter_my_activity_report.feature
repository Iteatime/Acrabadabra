Feature: Enter my activity report

In order to be paid
As a consultant
I want to enter my activity report

Background:
  Given the create page

Scenario Outline: I can fill the inputs
  When I fill my name <name>
  And I fill my <email>
  And I fill my mission <mission>
  And I fill my <client>
  And I click on "Valider mon CRA" button
  Then it should have been a <result>

  Examples:
    | name          | email             | mission                 | client   | result  |
    | Clément PONT  | cpont@itetime.fr  | Dev Fullstack Junior    | Iteatime | success |
    | unset         | cpont@itetime.fr  | Dev Fullstack Junior    | Iteatime | failure |
    | Clément PONT  | unset             | Dev Fullstack Junior    | Iteatime | failure |
    | Clément PONT  | not an email      | Dev Fullstack Junior    | Iteatime | failure |
    | Clément PONT  | cpont@itetime.fr  | unset                   | Iteatime | failure |
    | Clément PONT  | cpont@itetime.fr  | Dev Fullstack Junior    | unset    | failure |

Scenario: I can validate my seizures
  Given I have filed the form
  When I click on "Valider mon CRA" button
  Then a success message appears
  And a link to send by mail appear
  And a link to copy a modification link appear
  And a share link appear

Scenario: I made a mistake filling the form and I try to validate it
  When I click on "Valider mon CRA" button
  And I have not filed the form correctly
  Then a fail message appear
  And an error message appear near the input
  And I can't validate my form

Scenario: I change the value of an input after a form validation
  When I validated the form
  But I change the value of an input
  Then the Links and success message are hiden
  And I need to validate again the form

Scenario Outline: I can select the month i worked
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
  When select the days I worked
  Then the "Nombre total de journées :" should be updated aswell

Scenario: I want delete a worked day on the calendar
  Given I selected one day
  When I click on this day box
  Then this day is reset
  And the days selection should have been updated

Scenario: I worked only a half day
  Given I selected a day
  When I click on the blue box of this day
  Then the box size increase
  And new choice appears
  And I can click on half day

Scenario: I can go back to the homepage
  When I click the Logo
  Then I should go to the "homepage"
