Feature: Download an invoice

In order to get an invoice
As a user
I click the download button

Scenario: My invoice should show my business name I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my business name I entered

Scenario: My invoice should show my business address I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my business address I entered

Scenario: My invoice should show my phone number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my "Tel" I entered

Scenario: My invoice should show my SIREN number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my SIREN number I entered

Scenario: My invoice should show my trade and companies register city I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my "R.C.S." I entered

Scenario: My invoice should show my trade and companies register exemption I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form with my "Dispensé d'immatriculation au RCS et au RM" checked
  When I download my invoice
  Then I should see my trade and companies register exemption I entered

Scenario: My invoice should show my vat number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my "N° TVA intra-communautaire" I entered

Scenario: My invoice should be duty free if I haven have a vat exemption
  Given I have filled the timesheet informations
  And I have filled the invoice form with my "Franchise TVA" checked
  When I download my invoice
  Then I should see my duty free invoice
  And I shouldn't see my "N° TVA intra-communautaire"




Scenario: My invoice should show my client's business name I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my client's business name I entered

Scenario: My invoice should show my client's business address I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my client's business address I entered

Scenario: My invoice should show my client's phone number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my client's "Tel" I entered

Scenario: My invoice should show my client's SIREN number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see my client's SIREN number I entered

Scenario: My invoice should show my client's trade and companies register city I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form with
  When I download my client's invoice
  Then I should see my "R.C.S." I entered

Scenario: My invoice should show my client's trade and companies register exemption I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form with my client's "Dispensé d'immatriculation au RCS et au RM" checked
  When I download my invoice
  Then I should see my client's trade and companies register exemption I entered

Scenario: My invoice should show my client's vat number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my client's invoice
  Then I should see my client's "N° TVA intra-communautaire" I entered

Scenario: My invoice shouldn't show my client's VAT number if I have checked exemption
  Given I have filled the timesheet informations
  And I have filled the invoice form with my client's "Franchise TVA" checked
  When I download my invoice
  Then I shouldn't see my client's "N° TVA intra-communautaire"




Scenario: My invoice should show the billing number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "FACTURE N°" I entered

Scenario: My invoice should show the client reference number I entered
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Référence client" I entered

Scenario: My invoice should show it's date of record
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Date" I entered





Scenario: My invoice should show at least four lines on the billing table
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see at lest 4 lines on the chart

Scenario: My invoice should show my working days
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Journée d’intervention" I entered

Scenario: My invoice should show a line for mileage expenses
  Given I have filled the timesheet informations
  And I have filled the mileage expenses form
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Indémnités kilométriques" I entered

Scenario: My invoice should show some lines of miscellaneous expenses
  Given I have filled the timesheet informations
  And I have filled the miscellaneous expenses form
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Frais sur justificatifs" I entered

Scenario: My invoice should show some lines of flat fee expense
  Given I have filled the timesheet informations
  And I have filled the flat fee expense form
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Déplacements forfaitairess" I entered

Scenario: My invoice should show the amount excluding tax
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Total HT"

Scenario: My invoice should show the amount of tax per rate
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the amount of tax per rate

Scenario: My invoice should show the amount of tax per rate
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the amount the total tax inclusive




Scenario: My invoice should show the consultant in charge of the service
  Given I have filled the timesheet informations
  And I have filled the flat fee expense form
  When I download my invoice
  Then I should see the "Consultant chargé de la prestation" I entered

Scenario: My invoice should show its related period of execution
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Date d’exécution de la vente ou de la prestation" I entered

Scenario: My invoice should show its payment date
  Given I have filled the timesheet informations
  And I have filled the invoice form
  When I download my invoice
  Then I should see the "Date de règlement" I entered

Scenario: My invoice should show the payment late penalty
  Given I have filled the timesheet informations
  And I have filled the invoice form with "Pénalités de retard légales (40€ par facture + 10% par an)"
  When I download my invoice
  Then I should see an indication of late payment penalties

Scenario: My invoice should show the payment modalty
  Given I have filled the timesheet informations
  And I have filled the invoice form with "Pénalités de retard légales (40€ par facture + 10% par an)"
  When I download my invoice
  Then I should see the "Modalités de paiement" I entered

Scenario: My invoice should show my banking details
  Given I have filled the timesheet informations
  And I have filled the invoice form with the "Coordonnées bancaires"
  When I download my invoice
  Then I should see the "Coordonnées bancaires" I entered




Scenario: My invoice should show an an expenses mileage recap chart
  Given I have filled the timesheet informations
  And I have filled the expenses mileage form
  And I have filled the invoice form
  When I download my invoice
  Then I should see an appendix containing the "Détail des indemnités kilométriques"

Scenario: My invoice should show an a miscellaneous expenses recap chart
  Given I have filled the timesheet informations
  And I have filled the miscellaneous expenses form
  And I have filled the invoice form
  When I download my invoice
  Then I should see an appendix containing the "Détail des frais sur justificatif"

Scenario: My invoice should show an a flat fee expense recap chart
  Given I have filled the timesheet informations
  And I have filled the flat fee expense form
  And I have filled the invoice form
  When I download my invoice
  Then I should see an appendix containing the "Détail des déplacements forfaitaires"
