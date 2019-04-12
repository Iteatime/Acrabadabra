Feature: I receive a notification

 As a user, I want to get notified

Background:
   Given A notification just appears

Scenario: The notification is getting out of time
  Given the notification has a duration
  When It time's up
  Then the notification should disappears

Scenario: I want to dismiss this notification
   Given the notification is dismissable
   When I click on "close" button
   Then the notification should disappears
