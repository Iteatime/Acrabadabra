Feature: load a timesheet from local storage

    As a use, i want load a previous timesheet using local storage

Scenario: I can save a timesheet
Given I have filled my timesheet
And Others fields of the form
When I click "Valider mon CRA" button
Then this timesheet will be save in local storage

Scenario: I can choose a saved
Given I have chosen RCS exemption for me and the client in my invoice form
When I click the download as PDF link
Then RCS city names will not appear in my PDF invoice
And will not appear in the remind of personal informations at the bottom of the invoice
But messages about RCS exemption will appear on the top of the invoice

Scenario: I can choose the VAT exemption
Given I have choosen the VAT exemption
When I click the download as PDF link
Then my PDF invoice will not contain a total incl tax
But only total excl tax
