Feature: generate an expense report of mileage allowance

    As a consultant, I want to get a refund, then I declare them.

Background:
  Given I am editing a timesheet

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

Scenario: I Add a mileage expense
  Given I have filled-out the "Date", "Trajet", "Distance parcourue" and "Véhicule" inputs
  When I click the button "Ajouter"
  Then a new line containing these informations appears in the chart below
  And the "Total HT" cell is ubdated

Scenario: I forgot to fill in a form field
  Given I forgot to fill in a form field
  And I click on "Ajouter" button
  Then an error message appears near the input associated with
  And I can't validate my form
  And no line is generated in the table

Scenario: I want to delete a line of table mileage allowance
  When I click on the trash icon of a line in the table
  Then the line of this table is deleted
  And the "Total HT" cell is ubdated

