Feature: transfer my invoice

   As a provider I want transfer the present invoice for re-invoicing

Background:
   Given I am on timesheet review page

Scenario: I need to re-invoice my consultant invoice to my client
   When I click on "Facturer ce CRA" button
   Then a new timesheet edit page appears with pre-filled informations about consultant
   And a new timesheet edit page appears with pre-filled informations about mission
   And a new timesheet edit page appears with pre-filled working days
   And a new timesheet edit page appears with pre-filled informations of my company in provider side form

