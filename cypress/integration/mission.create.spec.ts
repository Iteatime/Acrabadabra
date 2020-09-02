import {netlify} from '../fixtures/netlify';
import {routes} from '../accessor/cypress-config';
import {mission} from '../fixtures/mission';
import {missionConsultant} from '../fixtures/mission-consultant';
import {missionProvider} from '../fixtures/mission-provider';
import {missionClient} from '../fixtures/mission-client';
import {button} from '../fixtures/button';

describe('Test create form mission', function () {
  beforeEach(() => {
    cy.server();
    netlify.tryToLogin();
  });

  it('Minimum required form', function () {
    cy.visit(routes.missionCreate);

    mission.adminFillAndCheckCreate();

    missionConsultant.fillAndCheckCreate();

    missionProvider.fillAndCheckCreate();

    missionClient.fillAndCheckCreate();

    mission.routeCreate();

    button.validMission();

    mission.waitCreate();

    cy.url().should('include', '/dashboard');
  });
});
