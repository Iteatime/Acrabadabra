Feature: generate an expense report of mileage allowance

    As a consultant, I want to get a refund, then I declare them.

Background:
  Given I am on timesheet edit page

Scenario: I need to enter an expense of type mileage
  When I click on "Ajouter des frais" checkbox
  Then the associated form appear

Scenario: I want close my expenses form
  Given my expenses form is open
  When I click on "Ajouter des frais" checkbox
  Then it is hidden

Scenario Outline: I fill form named "Indemnités kilométriques"
  When I fill the date input with <Date>
  And I fill the destination input with <Destination>
  And I fill the distance input with <Distance-parcourue>
  And I fill the vehicle input with <Vehicle>
  And I click on "Ajouter" button
  Then It should add a line in the table below with all informations that I filled
  And a cell "IK" is gerated corresponding to <Distance> multiply by <Vehicle> tax rate
  And "Total" cell increment by the value of "IK" of this line

  Examples :
    | Date       | Destination | Distance-parcourue | Vehicle  | IK-Output | Total-Output |
    | unset      | Paris       | 450                | 0.493    | unset     | unset        |
    | 01/01/2019 | unset       | 450                | 0.493    | unset     | unset        |
    | 01/01/2019 | Paris       | unset              | 0.493    | unset     | unset        |
    | 01/01/2019 | Paris       | 450                | unset    | unset     | unset        |
    | 01/01/2019 | Paris       | 450                | 0.493    | 221.85    | 221.85       |

Scenario: I forgot to fill an input in the form
  When I forget to fill an input of the form
  And I click on "Ajouter" button
  Then an error message appear near the input associated with
  And I can't validate my form
  And no line is generated in the table

Scenario: I want to delete a line of table mileage allowance
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And "Total" cell decrement with the value of "IK" of this line

