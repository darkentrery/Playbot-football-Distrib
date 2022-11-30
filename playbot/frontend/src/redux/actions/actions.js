export const SIGN_UP_WINDOW = 'SIGN_UP_WINDOW';
export const LOGIN_WINDOW = 'LOGIN_WINDOW';
export const REFRESH_PASSWORD_WINDOW = 'REFRESH_PASSWORD_WINDOW';


export const signUpWindow = (value) => ({
  type: SIGN_UP_WINDOW,
  value,
});

export const loginWindow = (value) => ({
  type: LOGIN_WINDOW,
  value,
});

export const refreshPasswordWindow = (value) => ({
  type: REFRESH_PASSWORD_WINDOW,
  value,
});