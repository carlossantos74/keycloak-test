import { createApp } from 'vue'
import App from './App.vue'
import * as Keycloak from 'keycloak-js'

const initOptions = {
  url: 'http://127.0.0.1/auth', realm: 'keycloak-demo', clientId: 'app-vue', onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions);


keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    alert('Failed to initialize Keycloak');
  } else {
    console.log("Authenticated");
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.info('Token refreshed' + refreshed);
      } else {
        console.log('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 1000)

}).catch(() => {
  console.error("Authenticated Failed");
});

createApp(App).mount('#app')
