Feature: generate an invoice
    As a salesperson working for a software and computing services company,
    in order to simplify the input of timesheets for my consultants, I want to create mission

Scenario: I need to be connected for create a mission
Given I want to be connected for create a mission
When I arrive on homepage
Then I need to click on "Je suis une société de services" button
And then click click on "Créer une mission" link on dashboard page

Scenario: I can't create a mission if I get disconnected
Given I get disconnected from my account
When I click on "Créer cette mission"
Then an error message appears
And I need to connect to make it work

Scenario: I create a mission
Given I filled all inputs on mission creation page
When I click on "Créer cette mission" button
Then a success message appears
And a edit timesheet copy link appears
And my datas are stored in database

Scenario: I want a link to create a timesheet with mission informations
Given I filled all inputs on mission creation page
When I click on "Créer cette mission" button
Then an icon with message "Copier le lien de création de CRA" appears
And I can click on it to obtain a link to create a timesheet in my clipboard

Scenario: I want register consultant company informations if he is freelance
When I click on "consultant indépendant" checkbox
Then a form about consultant company appears
And a form about consultant banking informations appears