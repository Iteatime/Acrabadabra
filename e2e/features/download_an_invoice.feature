Feature: generate an invoice

    As a consultant, I want to be able to use an invoice with PDF format

Scenario: I can download my invoice as a PDF
Given I have filled my timesheet
And I have entered my billing details
When I click the download as PDF link
Then a PDF invoice with the corresponding data downloads to my computer

Scenario: I can choose the RCS exemption for me and the client
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

Scenario: What should includ the total excl tax of my invoice with the VAT exemption
Given I have choosen the VAT exemption
When my PDF invoice appears
Then the total excl tax of my invoice will contain the total excl tax of working days
And the total excl tax of mileage allowance
And the total excl tax of flat fees
And the total incl tax of miscellaneous expenses

Scenario: I want to see a total incl tax
Given I filled my timesheet
And I didn't choose VAT exemption
When I click the download as PDF link
Then my PDF invoice will contain a total excl tax
And will contain a total incl tax

Scenario: I want to be paid by any paiement method
Given I filled the billing form
When When I click the download as PDF link
Then a PDF invoice containing the date of billing will appear

Scenario: I want to be paid by bank transfer
Given I filled at least one information of my bank detail
When I click the download as PDF link
Then a PDF invoice containing this bank details will appear

Scenario: I want to inform my client about late fee of paiement
Given I have chosen to inform my client about late fee of paiement in the billing form
When I click the download as PDF link
Then a detailed message about late fee of paiement will be present in the PDF invoice

Scenario: I can consult quickly the different costs of my invoice
Given I filled my timesheet
And other expenses
When I click the download as PDF link
Then a summary table of costs will be present on the invoice
And this table will contain a line for each deductible vat rate and non deductible vat rate by type of expense

Scenario: I want consult details of invoiced fees
Given I filled expense form
When I click the download as PDF link
Then a table specific to each type of expense will be present in appendix of the invoice

Scenario: I want consult the total amounts by vat rates
Given I filled expenses form with different vat rates
When I click the download as PDF link
Then a line will be present for each total amount of vat rate

Scenario: I want know details about service delivery
Given I filled my timesheet
And filled the invoice form
When I click the download as PDF link
Then a line with the period of service delivery will be present
And the name of the consultant will be present

Scenario: I want to see a reminder of my personal informations at the bottom of my invoice
Given I filled my invoice form
When I click the download as PDF
Then a line at the bottom of each page of my PDF invoice will remind my personal informations
