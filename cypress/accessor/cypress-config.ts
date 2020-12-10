export const BASE_URL = 'http://localhost:4200';
export const PROD_URL = 'https://www.acrabadabra.com/';

export const routes = {
  timesheetCreate: BASE_URL + '/timesheet/create',
  missionCreate: BASE_URL + '/mission',
};

export const defineProdUrl = () => window.localStorage.setItem('netlifySiteURL', PROD_URL);
