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

Scenario: I want have client informations pre-filled if I have already saved a timesheet with a consultant and this client in my database when I re-invoice
  Given I already have a timesheet in my local storage with a consultant associated to a provider and a client
  When I click on "Facturer ce CRA" button with a timesheet with this provider as a client and this consultant as a provider
  Then a new timesheet edit page appears with pre-filled informations about consultant
  And a new timesheet edit page appears with pre-filled informations about mission
  And a new timesheet edit page appears with pre-filled working days
  And a new timesheet edit page appears with pre-filled informations about this client
  And a new timesheet edit page appears with pre-filled informations about this provider
  And a new timesheet edit page appears with pre-filled informations about banking informations
  And none informations about dates
  And none information about invoice number
