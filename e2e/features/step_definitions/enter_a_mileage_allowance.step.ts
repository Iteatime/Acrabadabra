import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { When } from 'cucumber';
import { Actions } from './common/actions';
import { Selectors } from './common/selectors';

const expect = chai.use(chaiAsPromised).expect;

When('I fill all inputs in the mileage allowance form', async () => {
  await Actions.enterText(
    Selectors.inputByLabelAndBlockName('Date', 'Indemnités kilométriques'),
    '19032019',
    '2019-03-19',
  );

  await Actions.enterText(Selectors.inputByLabelAndBlockName('Trajet', 'Indemnités kilométriques'), 'Annecy');

  await Actions.enterText(
    Selectors.inputByLabelAndBlockName('Distance parcourue (en km)', 'Indemnités kilométriques'),
    '5',
  );

  await Actions.enterText(
    Selectors.inputByLabelAndBlockName('Véhicule', 'Indemnités kilométriques'),
    '5 CV (0.543€/km)',
  );
});
