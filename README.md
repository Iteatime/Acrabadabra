# Acrabadabra

This repo contains the sources of the app, netlify functions and configuration files.

## How To start:

### 1 Requirements:

* Node.js version 10.x: [latest](https://nodejs.org/en/download/current/)
* Angular CLI: `npm install -g @angular/cli`
* Netlify lambda CLI : `npm install netlify-lambda`
    
### 2 Installation:

* Here you have to clone this repo then run: 
    `npm install`
    
### 3 Dev Server:

* To test your code you can run:
    `npm run dev`
   
 By default, the front runs on `localhost:4200/`, and the back on `localhost:9000/`.

#### 3.1 Lambda usage

To call a lambda, you can call this endpoint : 
- `<root>/.netlify/functions/{function_name}`

Ex: A get on this root `localhost:9000/.netlify/functions/status` will return a 200

> Here is a [documentation](https://www.netlify.com/docs/functions/#javascript-lambda-functions) to know more about `netlify lambda function` 

## Continous deployment:

The code pushed on this repo is continously deployed to [Netlify](https://www.netlify.com/).

`master` is the production branch. What you push there is built and sent live [here](https://acrabadabra.netlify.com/).

Any other branch or pull request will be automatically deployed too. Check out [Netlify documentation](https://www.netlify.com/docs/continuous-deployment/) to learn more.