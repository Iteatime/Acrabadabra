Feature: generate an expense report of mileage allowance

    As a consultant, I want to get a refund, then I declare them.

Background:
  Given I am on timesheet edit page

Scenario: I need to enter an expense of type mileage
  When I click on "Ajouter des frais" checkbox
  Then the associated form appears

Scenario: I want close my expenses form
  Given my expenses form is open
  When I click on "Ajouter des frais" checkbox
  Then it is hidden

Scenario: I want to select a vehicle in a dropdown
  When I click on the vehicle selector
  Then a list of each fiscal power appears
  And I can click on the wanted vehicle power

Scenario Outline: I want to see a table of my mileage allowances
  When I fill the date input with <Date>
  And I fill the journey input with <Trajet>
  And I fill the distance input with <Distance-parcourue>
  And I fill the vehicle input with <Vehicle>
  And I click on "Ajouter" button
  Then It should add a line in the table below with all informations that I filled
  And a cell "IK" is gerated corresponding to <Distance> multiply by <Vehicle> tax rate
  And "Total" cell increment by the value of "IK" of this line
  And a trash icon appears at the end of each line with informations

  Examples :
    | Date       | Trajet      | Distance-parcourue | Vehicle  | IK-Output | Total-Output |
    | unset      | Paris       | 450                | 0.493    | unset     | unset        |
    | 01/01/2019 | unset       | 450                | 0.493    | unset     | unset        |
    | 01/01/2019 | Paris       | unset              | 0.493    | unset     | unset        |
    | 01/01/2019 | Paris       | 450                | unset    | unset     | unset        |
    | 01/01/2019 | Paris       | 450                | 0.493    | 221.85    | 221.85       |

Scenario: I forgot to fill an input in the form
  When I forget to fill an input of the form
  And I click on "Ajouter" button
  Then an error message appears near the input associated with
  And I can't validate my form
  And no line is generated in the table

Scenario: I want to delete a line of table mileage allowance
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And "Total" cell decrements with the value of "IK" of this line

