// The code here that is only specific to the authorization towards Auth0's API is taken from they're quickstart-guide.

import auth0 from 'auth0-js';
import EventEmitter from 'events';
import authConfig from '../../auth_config.json';
import "es6-promise/auto";
import store from './../store/index';

import { RepositoryFactory } from '../api/RepositoryFactory';
const userRepository = RepositoryFactory.get('user');

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
});

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  // Starts the user login flow
  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;

    this.postNewUser();

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.exp * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== "true") {
        return reject("Not logged in");
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: window.location.origin
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  isAuthenticated() {
    return (
      Date.now() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }

  async postNewUser() {

    let responseObject = null;

    // Code written not by Auth0 -
    console.log("kjører localLogin()");
    const userToPost = {
      name: '',
      email: this.profile.email
    }

    await userRepository.postNewUser(userToPost)
    .then(result => {
      responseObject = result.data;
    });

    store.dispatch('SET_USER', responseObject);
    
  }
}

export default new AuthService();