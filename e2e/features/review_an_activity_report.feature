Feature: Review an activity report

In order to review an activity report
As a client
I open the given link

Scenario: I can see for witch month it is
  When I review an activity report
  Then I can see the month that it is related to next to "Période"

Scenario: I can see how many day was worked this month
  When I review an activity report
  Then I can see the number of worked days next to "Nombre de journées"

Scenario: I can download its associated invoice
  When I review an activity report
  And it has an invoice associated
  Then I can see a "Télécharger a facture" button
  And I can click this button to download the invoice

Scenario: I can see a calendar showing me every day was worked
  When I review an activity report
  And the consultant who made it has worked at least a day on this month
  Then I should see every day that he worked on the calendar

Scenario: I can have list of its associated expenses
  When I review an activity report
  And it has some expenses associated
  Then I can see a table showing me every of them
