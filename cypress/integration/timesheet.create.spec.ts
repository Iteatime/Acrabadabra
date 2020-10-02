import { routes } from '../accessor/cypress-config';
import { checkCalendar } from '../accessor/calendar-business-days';
import { consultant } from '../fixtures/consultant';
import { mission } from '../fixtures/mission';
import { calendar } from '../fixtures/calendar';
import { mileage } from '../fixtures/mileage';
import { miscellaneous } from '../fixtures/miscellaneous';
import { flatFee } from '../fixtures/flatFee';
import { invoice } from '../fixtures/invoice';
import { invoiceProvider } from '../fixtures/invoice-provider';
import { invoiceClient } from '../fixtures/invoice-client';
import { invoicePayment } from '../fixtures/invoice-payment';
import { button } from '../fixtures/button';

describe('Test create form CRA', function () {
  it('Minimum required form', function () {
    cy.visit(routes.timesheetCreate);
    cy.title().should('eq', "Acrabadabra - Saisir un compte rendu d'activité");

    consultant.fillAndCheckCreate();

    mission.fillAndCheckCreate();

    calendar.fillAndCheckCreate();

    // Fees
    button.addFees();

    mileage.fillAndCheckCreate();

    // Add new Mileage
    mileage.add('2020-01-01', 'AR La Fouillouse - Saint-Etienne', 42, 'Taux légal: 4 CV (0.518€/km)');
    cy.getByRole('ik-table').within(() => {
      cy.get('tbody').find('tr').should('have.length', 3);
      cy.getByRole('button-ik-table-1-delete').click();
      cy.get('tbody').find('tr').should('have.length', 2);
    });

    miscellaneous.fillAndCheckCreate();

    // Add new Miscellaneous
    miscellaneous.add('2020-01-01', '42.42', 'Repas (TVA déductible)', '20', 'Burger King');
    cy.getByRole('miscellaneous-table').within(() => {
      cy.get('tbody').find('tr').should('have.length', 3);
      cy.getByRole('button-miscellaneous-table-1-delete').click();
      cy.get('tbody').find('tr').should('have.length', 2);
    });

    flatFee.fillAndCheckCreate();

    // Add new Flat Fee
    flatFee.add('2020-01-01', '42.42');
    cy.getByRole('flat-fee-table').within(() => {
      cy.get('tbody').find('tr').should('have.length', 3);
      cy.getByRole('button-flat-fee-table-1-delete').click();
      cy.get('tbody').find('tr').should('have.length', 2);
    });

    // Invoice
    button.addInvoice();

    invoice.fillAndCheckCreate();

    invoiceProvider.fillAndCheckCreate();

    invoiceClient.fillAndCheckCreate();

    invoicePayment.fillAndCheckCreate();

    // Valid form
    button.validCra().then(() => {
      // Check localstorage
      const jwt = window.localStorage.getItem('timesheet.1');
      const data = JSON.parse(decodeURIComponent(escape(atob(jwt))));

      expect(data.consultant.name).to.contain('Rémy');
      expect(data.consultant.email).to.contain('me@remy.ovh');
      // checkCalendar(data.workingDays);

      expect(data.mission).to.deep.equal({
        id: '',
        missionCreator: '',
        client: 'Bedrock',
        title: 'Développeur PHP',
        consultantCompany: {
          name: '',
          address: '',
          telephone: '',
          siren: '',
          tradeAndCompaniesRegisterCity: '',
          tradeAndCompaniesRegisterExemption: false,
          vatNumber: null,
          vatExemption: false,
        },
        providerCompany: {
          name: 'John',
          address: 'Avenue de la soif',
          telephone: '0606060606',
          siren: 'SIREN',
          tradeAndCompaniesRegisterCity: 'RCS',
          tradeAndCompaniesRegisterExemption: false,
          vatNumber: 'VAT',
          vatExemption: false,
        },
        clientCompany: {
          name: 'IteamTime',
          address: '38 rue Villedieu 33 000 Bordeaux',
          telephone: '0606060606',
          siren: 'SIREN',
          tradeAndCompaniesRegisterCity: 'RCS',
          tradeAndCompaniesRegisterExemption: false,
          vatNumber: 'VAT',
          vatExemption: false,
        },
        providerBankAccountHolder: '',
        providerBankingAgency: '',
        providerBankingDomiciliation: '',
        providerBankIBAN: '',
        providerBankSWIFT: '',
        consultantBankAccountHolder: '',
        consultantBankingAgency: '',
        consultantBankingDomiciliation: '',
        consultantBankIBAN: '',
        consultantBankSWIFT: '',
      });

      expect(data.commutes).to.deep.equal([
        {
          date: '2020-01-01',
          journey: 'AR Annecy - Lyon',
          distance: '42',
          allowance: '0.518',
          mileageAllowance: 21.756,
          vehicleSelected: 1,
        },
      ]);

      expect(data.miscellaneous).to.deep.equal([
        {
          miscellaneousType: 'Péage',
          tvaRate: 20,
          wording: 'Test',
          date: '2020-01-01',
          amount: '42.42',
          selectedType: 1,
        },
      ]);

      expect(data.flatFees).to.deep.equal([
        {
          date: '2020-01-01',
          amount: '42.42',
        },
      ]);

      expect(data.invoice).to.deep.equal({
        bankAccountHolder: 'John Doe',
        bankingAgency: 'Confluence',
        bankingDomiciliation: 'Lyon',
        bankIBAN: 'IBAN',
        bankSWIFT: 'SWIFT',
        clientRef: 'IteaTime',
        provider: {
          name: 'John',
          address: 'Avenue de la soif',
          telephone: '0606060606',
          siren: 'SIREN',
          tradeAndCompaniesRegisterCity: 'RCS',
          tradeAndCompaniesRegisterExemption: false,
          vatNumber: 'VAT',
          vatExemption: false,
        },
        client: {
          name: 'IteamTime',
          address: '38 rue Villedieu 33 000 Bordeaux',
          telephone: '0606060606',
          siren: 'SIREN',
          tradeAndCompaniesRegisterCity: 'RCS',
          tradeAndCompaniesRegisterExemption: false,
          vatNumber: 'VAT',
          vatExemption: false,
        },
        number: 'IT-01',
        date: '2020-01-01',
        workedRate: '42',
        paymentDate: '2020-01-01',
        paymentModality: 'Virement',
        paymentLatePenalty: true,
      });
    });
  });
});

/*
eyJjb25zdWx0YW50Ijp7ImVtYWlsIjoibWVAcmVteS5vdmgiLCJuYW1lIjoiUsOpbXkifSwibWlzc2lvbiI6eyJpZCI6IiIsIm1pc3Npb25DcmVhdG9yIjoiIiwiY2xpZW50IjoiQmVkcm9jayIsInRpdGxlIjoiRMOpdmVsb3BwZXVyIFBIUCIsImNvbnN1bHRhbnRDb21wYW55Ijp7Im5hbWUiOiIiLCJhZGRyZXNzIjoiIiwidGVsZXBob25lIjoiIiwic2lyZW4iOiIiLCJ0cmFkZUFuZENvbXBhbmllc1JlZ2lzdGVyQ2l0eSI6IiIsInRyYWRlQW5kQ29tcGFuaWVzUmVnaXN0ZXJFeGVtcHRpb24iOmZhbHNlLCJ2YXROdW1iZXIiOm51bGwsInZhdEV4ZW1wdGlvbiI6ZmFsc2V9LCJwcm92aWRlckNvbXBhbnkiOnsibmFtZSI6IkpvaG4iLCJhZGRyZXNzIjoiQXZlbnVlIGRlIGxhIHNvaWYiLCJ0ZWxlcGhvbmUiOiIwNjA2MDYwNjA2Iiwic2lyZW4iOiJTSVJFTiIsInRyYWRlQW5kQ29tcGFuaWVzUmVnaXN0ZXJDaXR5IjoiUkNTIiwidHJhZGVBbmRDb21wYW5pZXNSZWdpc3RlckV4ZW1wdGlvbiI6ZmFsc2UsInZhdE51bWJlciI6IlZBVCIsInZhdEV4ZW1wdGlvbiI6ZmFsc2V9LCJjbGllbnRDb21wYW55Ijp7Im5hbWUiOiJJdGVhbVRpbWUiLCJhZGRyZXNzIjoiMzggcnVlIFZpbGxlZGlldSAzMyAwMDAgQm9yZGVhdXgiLCJ0ZWxlcGhvbmUiOiIwNjA2MDYwNjA2Iiwic2lyZW4iOiJTSVJFTiIsInRyYWRlQW5kQ29tcGFuaWVzUmVnaXN0ZXJDaXR5IjoiUkNTIiwidHJhZGVBbmRDb21wYW5pZXNSZWdpc3RlckV4ZW1wdGlvbiI6ZmFsc2UsInZhdE51bWJlciI6IlZBVCIsInZhdEV4ZW1wdGlvbiI6ZmFsc2V9LCJwcm92aWRlckJhbmtBY2NvdW50SG9sZGVyIjoiIiwicHJvdmlkZXJCYW5raW5nQWdlbmN5IjoiIiwicHJvdmlkZXJCYW5raW5nRG9taWNpbGlhdGlvbiI6IiIsInByb3ZpZGVyQmFua0lCQU4iOiIiLCJwcm92aWRlckJhbmtTV0lGVCI6IiIsImNvbnN1bHRhbnRCYW5rQWNjb3VudEhvbGRlciI6IiIsImNvbnN1bHRhbnRCYW5raW5nQWdlbmN5IjoiIiwiY29uc3VsdGFudEJhbmtpbmdEb21pY2lsaWF0aW9uIjoiIiwiY29uc3VsdGFudEJhbmtJQkFOIjoiIiwiY29uc3VsdGFudEJhbmtTV0lGVCI6IiJ9LCJ3b3JraW5nRGF5cyI6eyI3LjIwMjAiOlt7InRpbWUiOjAsInVuaXQiOiIifSx7InRpbWUiOjAsInVuaXQiOiIifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MCwidW5pdCI6IiJ9LHsidGltZSI6MCwidW5pdCI6IiJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjowLCJ1bml0IjoiIn0seyJ0aW1lIjowLCJ1bml0IjoiIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjAsInVuaXQiOiIifSx7InRpbWUiOjAsInVuaXQiOiIifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifSx7InRpbWUiOjEsInVuaXQiOiJkYXlzIn0seyJ0aW1lIjoxLCJ1bml0IjoiZGF5cyJ9LHsidGltZSI6MCwidW5pdCI6IiJ9LHsidGltZSI6MCwidW5pdCI6IiJ9LHsidGltZSI6MSwidW5pdCI6ImRheXMifV19LCJjb21tdXRlcyI6W3siZGF0ZSI6IjIwMjAtMDEtMDEiLCJqb3VybmV5IjoiQVIgQW5uZWN5IC0gTHlvbiIsImRpc3RhbmNlIjoiNDIiLCJhbGxvd2FuY2UiOiIwLjUxOCIsIm1pbGVhZ2VBbGxvd2FuY2UiOjIxLjc1NiwidmVoaWNsZVNlbGVjdGVkIjoxfV0sIm1pc2NlbGxhbmVvdXMiOlt7Im1pc2NlbGxhbmVvdXNUeXBlIjoiUMOpYWdlIiwidHZhUmF0ZSI6MjAsIndvcmRpbmciOiJUZXN0IiwiZGF0ZSI6IjIwMjAtMDEtMDEiLCJhbW91bnQiOiI0Mi40MiIsInNlbGVjdGVkVHlwZSI6MX1dLCJmbGF0RmVlcyI6W3siZGF0ZSI6IjIwMjAtMDEtMDEiLCJhbW91bnQiOiI0Mi40MiJ9XSwiaW52b2ljZSI6eyJiYW5rQWNjb3VudEhvbGRlciI6IkpvaG4gRG9lIiwiYmFua2luZ0FnZW5jeSI6IkNvbmZsdWVuY2UiLCJiYW5raW5nRG9taWNpbGlhdGlvbiI6Ikx5b24iLCJiYW5rSUJBTiI6IklCQU4iLCJiYW5rU1dJRlQiOiJTV0lGVCIsImNsaWVudFJlZiI6Ikl0ZWFUaW1lIiwicHJvdmlkZXIiOnsibmFtZSI6IkpvaG4iLCJhZGRyZXNzIjoiQXZlbnVlIGRlIGxhIHNvaWYiLCJ0ZWxlcGhvbmUiOiIwNjA2MDYwNjA2Iiwic2lyZW4iOiJTSVJFTiIsInRyYWRlQW5kQ29tcGFuaWVzUmVnaXN0ZXJDaXR5IjoiUkNTIiwidHJhZGVBbmRDb21wYW5pZXNSZWdpc3RlckV4ZW1wdGlvbiI6ZmFsc2UsInZhdE51bWJlciI6IlZBVCIsInZhdEV4ZW1wdGlvbiI6ZmFsc2V9LCJjbGllbnQiOnsibmFtZSI6Ikl0ZWFtVGltZSIsImFkZHJlc3MiOiIzOCBydWUgVmlsbGVkaWV1IDMzIDAwMCBCb3JkZWF1eCIsInRlbGVwaG9uZSI6IjA2MDYwNjA2MDYiLCJzaXJlbiI6IlNJUkVOIiwidHJhZGVBbmRDb21wYW5pZXNSZWdpc3RlckNpdHkiOiJSQ1MiLCJ0cmFkZUFuZENvbXBhbmllc1JlZ2lzdGVyRXhlbXB0aW9uIjpmYWxzZSwidmF0TnVtYmVyIjoiVkFUIiwidmF0RXhlbXB0aW9uIjpmYWxzZX0sIm51bWJlciI6IklULTAxIiwiZGF0ZSI6IjIwMjAtMDEtMDEiLCJ3b3JrZWRSYXRlIjoiNDIiLCJwYXltZW50RGF0ZSI6IjIwMjAtMDEtMDEiLCJwYXltZW50TW9kYWxpdHkiOiJWaXJlbWVudCIsInBheW1lbnRMYXRlUGVuYWx0eSI6dHJ1ZX19
 */
