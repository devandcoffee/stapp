const getAuth0 = options => {
  const config = require("../config.json");
  const auth0 = require("auth0-js");
  return new auth0.WebAuth({
    clientID: config.AUTH0_CLIENT_ID,
    domain: config.AUTH0_CLIENT_DOMAIN
  });
};

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = container => {
  return {
    responseType: "token id_token",
    redirectUri: `${getBaseUrl()}/redirect`,
    scope: "openid profile email"
  };
};

export const authorize = () => getAuth0().authorize(getOptions());
export const logout = () => getAuth0().logout({ returnTo: getBaseUrl() });
export const parseHash = cb => getAuth0().parseHash(cb);
export const getUserInfo = (token, cb) => getAuth0().client.userInfo(token, cb);
