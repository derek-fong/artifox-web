const appUrl = 'https://silvercubes-artifox.firebaseapp.com';

export const environment = {
  apollo: {
    uri: 'https://artifox-graphql-server.herokuapp.com/graphql',
    ws: 'wss://artifox-graphql-server.herokuapp.com/graphql'
  },
  appId: 'artifox',
  auth: {
    auth0: {
      clientID: 'lEzsELujwKAjOmtTxloyKMilL3YXoo5N',
      domain: 'artifox.au.auth0.com',
      namespace: appUrl,
      responseType: 'token id_token',
      scope: `openid`,
      get audience () { return `https://${this.domain}/userinfo`; },
      get redirectUri () { return `${this.namespace}/auth/callback`; }
    }
  },
  production: true,
  url: appUrl
};
