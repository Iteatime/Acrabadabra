# Acrabadabra

This repo contains the sources of the app, netlify functions and configuration files.

## How To start:

### 1 Requirements:

- Node.js version 10.x: [latest](https://nodejs.org/en/download/current/)
- Angular CLI: `npm install -g @angular/cli`
- Netlify lambda CLI : `npm install -g netlify-lambda`

### 2 Installation:

Here you have to:

- clone this repo
- init the _pdf-to-url_ submodule by running `git submodule init ; git submodule update` (cf. [section 3.3](#3.3-pdf-api))
- run `yarn install`
- finally you have to set `PDF_API_URL` as environment variable.

### 3 Dev server:

- To test your code you can run `yarn dev`.

By default, the front runs on `localhost:4200/`.

#### 3.1 Lambda usage

To call a lambda, you can call this endpoint:

- `<root>/.netlify/functions/{function_name}`

Ex: A get on this root `localhost:4200/.netlify/functions/status` will return a 200

> Here is a [documentation](https://www.netlify.com/docs/functions/#javascript-lambda-functions) to know more about `netlify lambda function`

#### 3.2 Debugging lambdas

We use the inspector protocol to ease lambda debugging. You can get diagnostic infos using an inspector client like Chrome DevTools.

Details [here](https://nodejs.org/en/docs/guides/debugging-getting-started/)

#### 3.3 PDF api

We use the our url-to-pdf service to build pdf from HTML template.

> To install it locally you can run: `git submodule init` and `git submodule update` then:`npm install`

### 4 Unit tests:

To perform unit tests run:
`yarn test`

Edit [this file](https://github.com/Iteatime/Acrabadabra/blob/master/src/karma.conf.js) to change the configuration
(ex the [browser](https://karma-runner.github.io/3.0/config/browsers.html)).

### 5 End to end tests:

To perform end to end tests run:
`yarn e2e`

Edit [this file](https://github.com/Iteatime/Acrabadabra/blob/master/e2e/protractor.conf.js) to change the configuration
(ex the [browser](https://github.com/angular/protractor/blob/master/docs/browser-setup.md)).

## Continous deployment:

The code pushed on this repo is continously deployed to [Netlify](https://www.netlify.com/).

`master` is the production branch. What you push there is built and sent live [here](https://acrabadabra.netlify.com/).

Any other branch or pull request will be automatically deployed too. Check out [Netlify documentation](https://www.netlify.com/docs/continuous-deployment/) to learn more.

## Environment variables

In order to reduce the test and build times during the local dev and to launch the application in the same way as in production we use the following environment variables:

- `ENV` which defines the environment of execution, for this one we use 'prod' or 'dev'. It is defined in the package.json file in the various scripts.

- `PDF_API_URL` which defines the url of the PDF generation service and must be defined at the system level.

## Used Libraries

- [Angular Calendar](https://github.com/mattlewis92/angular-calendar)
- [Moment](https://momentjs.com/), a date management library
- [Concurrently](https://www.npmjs.com/package/concurrently), allows to run multiple commands concurrently
- [Lodash](https://lodash.com/), provides utility functions for common programming tasks
