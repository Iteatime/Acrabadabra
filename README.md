# Acrabadabra

This repo contains the sources of the app, netlify functions and configuration files.

## How To start :

### 1 Requirements :

* Node.js version 10.x: [latest](https://nodejs.org/en/download/current/)
* Angular CLI: [how to install](https://angular.io/guide/quickstart#npm-package-manager)
    
### 2 Installation :

* Here you have to clone this repo then run: 
    `npm install`
    
### 3 Serve Front locally :

* To save time the CLI uses the Node.js Development Web Server and provides you with ‘auto compile’ feature via:
    `ng serve`

* If not working try:
    `npm start`
   
by default, it run on localhost:4200/
    
### 4 Serve Lambda locally :

* In our dependences we have `netlify-lambda` which is a CLI that enable you to test in your local dev environment your lambda. To do so you should run:
    `netlify-lambda serve src/functions`
    
by default, it run on localhost:9000/


## How the deployment is achieved :

### When pushing master

When you push `master`, Netlify trigger 'prod' deploy and publish feature, which make the sever clone the repo branch master and build angular using prod argument. After a successful building the new version become the live version and replace the last one on the default URL.

### When pushing any other branch

When you push a branch, Netlify trigger deploy feature, which make the sever clone the repo branch and build angular using default arguments. After a successful building netlify assign to this branch a URL based on the site name prefixed with the branch name.

### When pushing staging

When you push `staging`, Netlify trigger deploy feature, which make the sever clone the repo branch and build angular using staging argument. After a successful building your branch is served on the staging URL which is made like any other branch.
