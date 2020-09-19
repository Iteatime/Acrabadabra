const moment = require('moment-business-days');

export const checkCalendar = (workingDays: object) => {
  const monthYearKey = Object.keys(workingDays)[0];
  const monthYear = monthYearKey.split('.');
  if (monthYear[0].length === 1) {
    monthYear[0] = '0' + (parseInt(monthYear[0]) + 1);
  } else {
    monthYear[0] = parseInt(monthYear[0]) + 1;
  }
  const now = moment(monthYear[1] + monthYear[0] + '01', 'YYYYMMDD');

  workingDays[monthYearKey].forEach(day => {
    if (now.isBusinessDay()) {
      expect(day).to.deep.equal({ time: 1, unit: 'days' });
    } else {
      expect(day).to.deep.equal({ time: 0, unit: '' });
    }
    now.add(1, 'days');
  });
};
