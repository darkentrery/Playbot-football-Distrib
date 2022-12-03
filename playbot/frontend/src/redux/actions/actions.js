export const SIGN_UP_WINDOW = 'SIGN_UP_WINDOW';
export const LOGIN_WINDOW = 'LOGIN_WINDOW';
export const REFRESH_PASSWORD_WINDOW = 'REFRESH_PASSWORD_WINDOW';
export const SUCCESS_REFRESH_PASSWORD_WINDOW = 'SUCCESS_REFRESH_PASSWORD_WINDOW';
export const SUCCESS_SIGN_UP_WINDOW = 'SUCCESS_SIGN_UP_WINDOW';
export const SUCCESS_SIGN_UP2_WINDOW = 'SUCCESS_SIGN_UP2_WINDOW';
export const SUCCESS_CREATE_EVENT_WINDOW = 'SUCCESS_CREATE_EVENT_WINDOW';
export const SUCCESS_EDIT_EVENT_WINDOW = 'SUCCESS_EDIT_EVENT_WINDOW';
export const CHOICE_CITY_WINDOW = 'CHOICE_CITY_WINDOW';
export const CREATE_EVENT_WINDOW = 'CREATE_EVENT_WINDOW';
export const CREATE_EVENT_UN_AUTH_WINDOW = 'CREATE_EVENT_UN_AUTH_WINDOW';
export const EDIT_EVENT_WINDOW = 'EDIT_EVENT_WINDOW';
export const CANCEL_EVENT_WINDOW = 'CANCEL_EVENT_WINDOW';
export const CONFIRM_PLAYERS_WINDOW = 'CONFIRM_PLAYERS_WINDOW';
export const FILL_REGULATION_WINDOW = 'FILL_REGULATION_WINDOW';
export const CONFIRM_TEAMS_WINDOW = 'CONFIRM_TEAMS_WINDOW';
export const MOBILE_FIRST_PAGE_WINDOW = 'MOBILE_FIRST_PAGE_WINDOW';

export const AUTH = 'AUTH';

export const EVENT = 'EVENT';
export const PLAYERS = 'PLAYERS';
export const STEPS = 'STEPS';


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

export const createEventWindow = (value) => ({
  type: CREATE_EVENT_WINDOW,
  value,
});

export const createEventUnAuthWindow = (value) => ({
  type: CREATE_EVENT_UN_AUTH_WINDOW,
  value,
});

export const editEventWindow = (value) => ({
  type: EDIT_EVENT_WINDOW,
  value,
});

export const cancelEventWindow = (value) => ({
  type: CANCEL_EVENT_WINDOW,
  value,
});

export const confirmPlayersWindow = (value) => ({
  type: CONFIRM_PLAYERS_WINDOW,
  value,
});

export const fillRegulationWindow = (value) => ({
  type: FILL_REGULATION_WINDOW,
  value,
});

export const confirmTeamsWindow = (value) => ({
  type: CONFIRM_TEAMS_WINDOW,
  value,
});

export const mobileFirstPageWindow = (value) => ({
  type: MOBILE_FIRST_PAGE_WINDOW,
  value,
});


export const auth = (value, user) => ({
  type: AUTH,
  value,
  user,
});


export const event = (value) => ({
  type: EVENT,
  value,
});

export const players = (value) => ({
  type: PLAYERS,
  value,
});

export const steps = (value) => ({
  type: STEPS,
  value,
});