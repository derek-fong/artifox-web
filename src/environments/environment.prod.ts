export const environment = {
  auth: {
    auth0: {
      clientID: 'lEzsELujwKAjOmtTxloyKMilL3YXoo5N',
      domain: 'artifox.au.auth0.com',
      namespace: 'https://silvercubes-artifox.firebaseapp.com',
      responseType: 'token id_token',
      scope: `openid profile`,
      get audience () { return `https://${this.domain}/userinfo`; },
      get redirectUri () { return `${this.namespace}/auth/callback`; }
    }
  },
  production: true
};
