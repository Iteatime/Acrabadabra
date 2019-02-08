const fs = require('fs');
const path = require('path');
const exec = require('child_process');
const readLine = require('readline');

const concurrently = require('concurrently');

const folder = path.resolve(__dirname);
const services = [];

readLine.createInterface({
  input: fs.createReadStream(path.resolve(folder, 'services.txt'))
}).on('line', (line) => {
  exec.exec(`cd ${ folder } && git clone ${ line }`);
});

setTimeout(() => {
  fs.readdir(folder, (err, elements) => {
    elements.forEach(element => {
      const dir = path.resolve(folder, element);
      if (fs.lstatSync(dir).isDirectory()) {
        services.push({ command: `cd ${ dir } && npm install`, name: element, prefixColor: 'reset.bgGreen.bold' });
      }
    });

    concurrently(services, {
      prefix: 'name'
    });
  });
}, 500)
