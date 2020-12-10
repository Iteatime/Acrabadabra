Feature: generate an invoice
    As a salesperson working for a software and computing services company, I want to see a list of company's missions.

Scenario: I want to see my missions
Given I am connected
When I arrive on my dashboard page
And I have missions
Then a line appears for each missions

Scenario: I don't have missions
Given I am connected
When I arrive on my dashboard page
And I don't have missions
Then my missions table is empty
And a red message saying that I don't have missions appears
