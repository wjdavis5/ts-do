export const environment = {
  production: true,
  oktaConfig: {
    clientId: '0oa3xjxfg1traSvHU5d7',
    issuer: `https://dev-4699488.okta.com/oauth2/default`,
    redirectUri: 'https://willstatictest.adesaauctionoperations.com/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  },
  ffioConfig: {
    baseUrl: "https://ts-do.wjd5.workers.dev"
  }
};
