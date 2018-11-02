# Acrabadabra

This repo contains the sources of the app, netlify functions and configuration files.

## How To start:

### 1 Requirements:

* Node.js version 10.x: [latest](https://nodejs.org/en/download/current/)
* Angular CLI: [how to install](https://angular.io/guide/quickstart#npm-package-manager)
    
### 2 Installation:

* Here you have to clone this repo then run: 
    `npm install`
    
### 3 Dev Server:

* To test your code you can run:
    `npm run dev`
   
 By default, the front runs on `localhost:4200/`, and the back on `localhost:4200/.netlify/functions/`.
 
 ### 4 Unit Test :

 To perform unit tests you have to run:
    `npm run test`

You can eventually want to change the configuration such as the [browser](https://karma-runner.github.io/3.0/config/browsers.html) used, this is done in [this file](https://github.com/Iteatime/Acrabadabra/blob/master/src/karma.conf.js).
 
 ### 4 End to end Test :

 To perform end to end test you have to run:
    `npm run e2e`

You can eventually want to change the configuration such as the [browser](https://github.com/angular/protractor/blob/master/docs/browser-setup.md) used, this is done in [this file](https://github.com/Iteatime/Acrabadabra/blob/master/e2e/protractor.conf.js).


## Continous deployment:

The code pushed on this repo is continously deployed to [Netlify](https://www.netlify.com/).

`master` is the production branch. What you push there is built and sent live [here](https://acrabadabra.netlify.com/).

Any other branch or pull request will be automatically deployed too. Check out [Netlify documentation](https://www.netlify.com/docs/continuous-deployment/) to learn more.
