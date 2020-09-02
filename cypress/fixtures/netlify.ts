import {defineProdUrl, PROD_URL} from '../accessor/cypress-config';
import {localStorageBackup} from '../accessor/local-storage-backup';

class Netlify {
  tryToLogin() {
    return localStorageBackup.tryRestore()
      .then((result: boolean) => {
        if (result !== true) {
          this.login();
        }
      });
  }

  login() {
    defineProdUrl();
    cy.request({
      method: 'POST',
      url: PROD_URL + '/.netlify/identity/token',
      body: {
        grant_type: 'password',
        username: 'cypress@mailna.me',
        password: 'cypress'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((tokenResponse) => {
      this.user(tokenResponse.body);
    });
  }

  private user(token) {
    cy.request({
      method: 'GET',
      url: PROD_URL + '/.netlify/identity/user',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      }
    }).then((userResponse) => {
      const user = userResponse.body;
      user.token = token;
      user.url = PROD_URL + '/.netlify/identity';
      window.localStorage.setItem('gotrue.user', JSON.stringify(user));
      localStorageBackup.backup();
    });
  }
}

export const netlify = new Netlify();
