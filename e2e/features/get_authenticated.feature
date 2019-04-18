Feature: load a timesheet from local storage

    As a service company, I want to get authenticated

Scenario: I can open the login form
Given I have navigated to the homepage
When I click on the button "Je suis une société de services"
Then The login form pop-in shows

Scenario: I can open the login form when reviewing a timesheet
Given I have navigated to the homepage
When I click on the button "Accèder à mon compte prestataire"
Then The login form pop-in shows

Scenario: I can register
Given I have opened the login form
And clicked the button "S'inscrire"
And I have filled my user ID
When I click the button "S'inscrire"
Then I'm registered

Scenario: I can login
Given I have opened the login form
And I have filled my user ID
When I click the button "Se connecter"
Then I'm logged in

Scenario: I can logout
Given I am logged in
And I have open the connection windows
When I click the button "Se déconnecter"
Then I'm logged out

Scenario: I fail to login
Given I have opened the login form
And I have filled my 	user ID
When I click the button "Se connecter"
Then I see a message telling me that my credentials are incorrect
