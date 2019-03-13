const fs = require('fs');

const replacer = require('replace-in-file');

const env = process.env.ENV;

const placeHolders = [
  /'PROD_ENV'/g,
  /PDF_API_KEY/g,
  /PDF_API_URL/g
]

const replacements = [
  env === 'prod',
  process.env.PDF_API_KEY,
  process.env.PDF_API_URL
];

const options = {
  files: 'src/environments/environment.*.ts',
  from: placeHolders,
  to: replacements
};

change = async() => {
  try {
    await fs.createReadStream('./src/environments/environment.ts').pipe(fs.createWriteStream(`./src/environments/environment.${ env }.ts`));
    const changes = await replacer(options)
    console.log('Modified file:', changes.join(', '));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}

change();
