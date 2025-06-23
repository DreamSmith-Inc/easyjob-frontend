// lib/tokenManager.ts
let _setAccessToken: ((token: string | null) => void) | null = null;

export const setAccessTokenSetter = (fn: (token: string | null) => void) => {
  _setAccessToken = fn;
};

export const setAccessToken = (token: string | null) => {
  if (_setAccessToken) _setAccessToken(token);
};
