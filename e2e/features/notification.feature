Feature: notification

Background:
   Given A notification just appears

Scenario: I want to dismiss this notification
   Given the notification is dismissable
   When I click on "close" button
   Then the notification should disappears
