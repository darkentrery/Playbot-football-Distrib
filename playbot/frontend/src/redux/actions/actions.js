export const SIGN_UP_WINDOW = 'SIGN_UP_WINDOW';
export const LOGIN_WINDOW = 'LOGIN_WINDOW';
export const REFRESH_PASSWORD_WINDOW = 'REFRESH_PASSWORD_WINDOW';
export const SUCCESS_REFRESH_PASSWORD_WINDOW = 'SUCCESS_REFRESH_PASSWORD_WINDOW';
export const SUCCESS_SIGN_UP_WINDOW = 'SUCCESS_SIGN_UP_WINDOW';
export const SUCCESS_SIGN_UP2_WINDOW = 'SUCCESS_SIGN_UP2_WINDOW';
export const SUCCESS_CREATE_EVENT_WINDOW = 'SUCCESS_CREATE_EVENT_WINDOW';
export const SUCCESS_EDIT_EVENT_WINDOW = 'SUCCESS_EDIT_EVENT_WINDOW';
export const CHOICE_CITY_WINDOW = 'CHOICE_CITY_WINDOW';
export const AUTH = 'AUTH';


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

export const successRefreshPasswordWindow = (value) => ({
  type: SUCCESS_REFRESH_PASSWORD_WINDOW,
  value,
});

export const successSignUpWindow = (value) => ({
  type: SUCCESS_SIGN_UP_WINDOW,
  value,
});

export const successSignUp2Window = (value) => ({
  type: SUCCESS_SIGN_UP2_WINDOW,
  value,
});

export const successCreateEventWindow = (value) => ({
  type: SUCCESS_CREATE_EVENT_WINDOW,
  value,
});

export const successEditEventWindow = (value) => ({
  type: SUCCESS_EDIT_EVENT_WINDOW,
  value,
});

export const choiceCityWindow = (value) => ({
  type: CHOICE_CITY_WINDOW,
  value,
});

export const auth = (value, user) => ({
  type: AUTH,
  value,
  user,
});