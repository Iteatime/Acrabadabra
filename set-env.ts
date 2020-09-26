import { magenta } from 'colors';
import { writeFile } from 'fs';

const env = process.env;

// Configure Angular `environment.ts` file path
const targetProdPath = './src/environments/environment.prod.ts';
const targetPath = './src/environments/environment.ts';

const json = {
  production: false,
  pdf_api_key: env.PDF_API_KEY,
  pdf_api_url: env.PDF_API_URL,
  short_url_api_key: env.SHORT_URL_API_KEY,
  short_url_api: env.SHORT_URL_API,
  short_url_workspace: env.SHORT_URL_WORKSPACE,
  FAUNADB_SECRET: '',
  CRYPTR_KEY: env.CRYPTR_KEY,
};

if (env.NETLIFY) {
  if ('production' === env.CONTEXT) {
    json.production = true;
    json.FAUNADB_SECRET = env.PROD_FAUNADB_SECRET;
  } else {
    json.FAUNADB_SECRET = env.PREV_FAUNADB_SECRET;
  }
} else if (env.CIRCLECI || env.CI) {
  json.FAUNADB_SECRET = env.FAUNADB_SECRET;
}

const envConfigFile = `export const environment = ${JSON.stringify(json)};`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});

writeFile(targetProdPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(magenta(`Angular environment.prod.ts file generated correctly at ${targetProdPath} \n`));
  }
});
