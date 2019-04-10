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

Scenario: I Add a miscellaneous expense
  Given I have filled-out the "Date", "Trajet", "Distance parcourue" and "Véhicule" inputs
  When I click the button "Ajouter"
  Then a new line containing these informations appears in the chart below
  And the "Total" cell is ubdated

Scenario: I forgot to fill in a form field
  Given I forgot to fill in a form field (except "label")
  When I click on "Ajouter" button
  Then an error message appears near the input associated with
  And I can't validate my form
  And no line is generated in the table

Scenario: I don't fill the "libellé" input
  Given I click on "Ajouter" button
  And "libellé" input is empty
  And others inputs are filled
  When I click on "Ajouter" button
  Then A line a table appears with all informations that I filled

Scenario: I want to delete a line of table miscellaneous expenses
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And the "Total" cell is ubdated
