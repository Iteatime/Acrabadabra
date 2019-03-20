Feature: generate an expense report of mileage allowance

    As a consultant, I want to get a refund, then I declare them.

Background:
 Given I am on timesheet edit page

Scenario: I need to generate an expense of type miscellaneous
  When I click on "Ajouter des frais" checkbox
  Then a form appears

Scenario: I want close my expenses generator
  Given my expenses generator is open
  When I click on "Ajouter des frais" checkbox
  Then the associated form is hidden

Scenario: I want choose my type of expense
  When I click on the type of expense selector
  Then a list of the different types of expense appears
  And I can click on the wanted type of expense

Scenario: I fill form named "Indemnités kilométriques"
  When I fill <Type-de-frais> input
  And I fill <Taux-de-TVA> input
  And I fill <Date> input
  And I fill <Montant-TTC> input
  But optionnaly <libelle> input
  And I click on "Ajouter" button
  Then A line in a with all those informations should be <Line>
  And a trash icon appears at the end of each line with informations
  And "Total" cell increment by the value of "Montant-TTC" of this line

  Examples : Inputs
  | Date         | Type-de-frais - libelle | Taux-de-TVA | Montant-TTC | Line  |
  | 01/01/2019   | unset                   | 10          | 458         | unset |
  | 01/01/2019   | Repas                   | unset       | 458         | unset |
  | unset        | Repas                   | 10          | 458         | unset |
  | 01/01/2019   | Repas                   | 10          | unset       | unset |
  | 01/01/2019   | Repas                   | 10          | 458         | set   |
  | 01/01/2019   | Repas                   | 10          | 458         | set   |

Scenario: I don't fill the "libellé" input
  When I click on "Ajouter" button
  And "libellé" input is empty
  And others inputs are filled
  Then A line a table appears with all informations that I filled

Scenario: I want to delete a line of table miscellaneous expenses
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And "Total" cell decrements with the value of "IK" of this line
