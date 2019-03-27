Feature: generate a flat fee expense

    As a consultant, I want to get a refund, then I declare them.

Background:
  Given I am on timesheet edit page

Scenario: I need to enter an expense of type flat fee
  When I click on "Ajouter des frais" checkbox
  Then the associated form appears

Scenario: I want close my expenses form
  Given my expenses form is open
  When I click on "Ajouter des frais" checkbox
  Then it is hidden

Scenario Outline: I want to see a table of my flat fee expenses
  When I fill the date input with <Date>
  And I fill the amount input with <Montant HT>
  And I click on "Ajouter" button
  Then It should add a line in the table below with all informations that I filled
  And "Total" cell increment by the value of "Montant HT" of this line
  And a trash icon appears at the end of each line with informations

  Examples :
    | Date       | Montant HT| Total-Output |
    | unset      | 51.50     | unset        |
    | 01/01/2019 | unset     | unset        |
    | 01/01/2019 | 51.50     | 51.50        |

Scenario: I forgot to fill an input in the form
  When I forget to fill an input of the form
  And I click on "Ajouter" button
  Then an error message appears near the input associated with
  And I can't validate my form
  And no line is generated in the table

Scenario: I want to delete a line of table mileage allowance
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And "Total HT" cell decrements with the value of "Montant HT" of this line

