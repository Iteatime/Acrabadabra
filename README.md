# Acrabadabra

This repo contains the sources of the app, netlify functions and configuration files.

## How To start :

### 1 Requirements :

* Node.js version 10.x: [latest](https://nodejs.org/en/download/current/)
* Angular CLI: [how to install](https://angular.io/guide/quickstart#npm-package-manager)
    
### 2 Installation :

* Here you have to clone this repo then run: 
    `npm install`
    
### 3 Dev Server :

* To test your code you can run:
    `npm run dev`
   
by default, the front run on `localhost:4200/`, and the lambda on `localhost:9000/`.


## How the deployment is achieved :

When a branch is pushed to this repo that trigger a deploy process on Netlify and, depending on it's name, this task is achieved following difrents way defined on the netlify.toml file. After a successful building, netlify assign a URL based on the site name prefixed with the branch name, exept `master` which recive the prod URL.
