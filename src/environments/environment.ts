// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const appUrl = 'http://localhost:4200';

export const environment = {
  appId: 'artifox-dev',
  auth: {
    auth0: {
      clientID: 'm3htc7qf25YObwGDmeP5ID8hGrCBsbEz',
      domain: 'artifox-dev.au.auth0.com',
      namespace: appUrl,
      responseType: 'token id_token',
      scope: `openid profile`,
      get audience () { return `https://${this.domain}/userinfo`; },
      get redirectUri () { return `${this.namespace}/auth/callback`; },
    }
  },
  production: false,
  url: appUrl
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
