Feature: generate an invoice
    As a salesperson working for a software and computing services company, I want to delete a mission.

Scenario: I want to delete a mission
Given I am on my dashboard
And I am connected
And I have a list of my missions
When I click on the trash icon
Then a confirmation window appears
And I can delete my mission if I click on "OK" button

Scenario: I can abort my mission's deletion
Given I started to delete a mission
And confirmation window appeared
When I click on the "Annuler" button
Then the confirmation window closes
And my mission is not deleted
