Feature: load a timesheet from local storage

    As a use, i want load a previous timesheet using local storage

Scenario: I can save a timesheet
Given I have filled my timesheet
When I click "Valider mon CRA" button
Then this timesheet will be save in local storage

Scenario: I want have pre-filled fields with my last timesheet informations validated
Given I have a saved timesheet in local storage
When I arrive on the create timesheet page
Then the last informations I saved in local storage are pre-filled
And expenses are reset
And workings day are reset
And invoice date and number are reset
And billing date is reset
