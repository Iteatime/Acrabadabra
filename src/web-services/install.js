const fs = require('fs');
const path = require('path');

const concurrently = require('concurrently');

const folder = path.resolve(__dirname);
const services = [];

fs.readdir(folder, (err, elements) => {
  elements.forEach(element => {
    const dir = path.resolve(folder, element);
    if (fs.lstatSync(dir).isDirectory() && fs.existsSync(dir + '/package.json')) {
      services.push({ command: `cd ${dir} && npm install`, name: element, prefixColor: 'reset.bgGreen.bold' });
    }
  });

  if (services.length > 0) {
    concurrently(services, {
      prefix: 'name',
    });
  }
});
