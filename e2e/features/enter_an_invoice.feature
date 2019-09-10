Feature: generate invoice

   As a consultant I want easily generate an invoice

Background:
   Given I am on timesheet edit page

Scenario: I need to generate an invoice
   When I click on "Generer une facture" checkbox
   Then the associated form appears
   Then the date input is pre-filled with the current day date

Scenario: I want close my invoice form
   Given my invoice form is open
   When I click on "Generer une facture" checkbox
   Then this form is hidden

Scenario: I fill the invoice form
   When I fill all inputs in the form
   And I click on "Valider mon CRA" button
   Then a success notification appears
   Then a link to an invoice PDF appears

Scenario: I forgot to fill a required input in the form
   When I click on "Valider mon CRA" button
   But I forget to fill an input
   Then a fail notification appears
   And an error message appears near the input
   And I can't validate my form

Scenario: I fill all required input in the form
  Given All required fields are completed but not the optional ones
   When I click on "Valider mon CRA" button
   Then The form is validated with not any problem

Scenario: I modify an input after a form validation
   When I validated the form
   But I modify an input
   Then the links and success notification are hidden
   And I need to validate again the form

Scenario: I want to download my invoice
   When I validated my form
   And I click on "Télécharger la facture" button
   Then my invoice is downloaded as a PDF file

Scenario: Exempt provider or customer of RCS/RM
   When I click on checkbox "Dispensé d'immatriculation au RCS et au RM" in form
   Then the related City immatriculation input become disabled

Scenario: I want apply vta exemption
   When I click on checkbox "Franchise TVA" in form
   Then the related vta number input become disabled
   And if the exeption concerns the provider vta will not be applied on total of the performance

Scenario: Late fee apply on customer invoice
   When I click on checkbox "Pénalités de retard légales"
   Then a late fee will be applied on total of the performance
