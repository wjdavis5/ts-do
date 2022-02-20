export const environment = {
  production: true,
  oktaConfig : {
    clientId: '0oa3xjxfg1traSvHU5d7',
    issuer: `https://dev-4699488.okta.com/oauth2/default`,
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  }
};
