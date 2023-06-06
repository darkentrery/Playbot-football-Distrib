import {
    CANCEL_EVENT_WINDOW,
    CHOICE_CITY_WINDOW,
    CONFIRM_PLAYERS_WINDOW,
    CONFIRM_TEAM_PLAYERS_WINDOW,
    CONFIRM_TEAMS_WINDOW,
    CREATE_EVENT_UN_AUTH_WINDOW,
    CREATE_EVENT_WINDOW,
    DELETE_ACCOUNT_WINDOW,
    EDIT_EVENT_WINDOW,
    END_GAME_WINDOW,
    FILL_REGULATION_WINDOW,
    LEAVE_EVENT_WINDOW,
    LOGIN_WINDOW,
    MOBILE_FIRST_PAGE_WINDOW,
    ONBOARDING_STEP_1_WINDOW,
    ONBOARDING_STEP_2_WINDOW,
    ONBOARDING_STEP_3_WINDOW,
    REFRESH_PASSWORD_WINDOW,
    REPEAT_EVENT_WINDOW,
    SHOW_EMBLEM_WINDOW,
    SHOW_MENU_WINDOW,
    SIGN_UP_WINDOW,
    SUCCESS_CANCEL_EVENT_WINDOW,
    SUCCESS_CREATE_EVENT_WINDOW,
    SUCCESS_EDIT_EVENT_WINDOW,
    SUCCESS_EXISTS_USER_WINDOW,
    SUCCESS_REFRESH_PASSWORD_WINDOW,
    SUCCESS_SIGN_UP2_WINDOW,
    SUCCESS_SIGN_UP_WINDOW,
    SUCCESS_UPDATE_PASSWORD_WINDOW,
    SUCCESS_UPDATE_USER_WINDOW,
    UN_AUTH_JOIN_WINDOW,
    UPDATE_PASSWORD_WINDOW
} from "../actions/actions";

const initialState = {
    isOpenSignUp: false,
    isOpenLogin: false,
    isOpenRefreshPassword: false,
    isOpenSuccessRefreshPassword: false,
    isOpenSuccessSignUp: false,
    isOpenSuccessSignUp2: false,
    isOpenSuccessCreateEvent: false,
    isOpenSuccessEditEvent: false,
    isOpenSuccessCancelEvent: false,
    isOpenSuccessUpdateUser: false,
    isOpenSuccessUpdatePassword: false,
    isOpenSuccessExistsUser: false,
    isOpenChoiceCity: false,
    isOpenCreateEvent: false,
    isOpenCreateEventUnAuth: false,
    isOpenEditEvent: false,
    isOpenRepeatEvent: false,
    isOpenCancelEvent: false,
    isOpenConfirmPlayers: false,
    isOpenFillRegulation: false,
    isOpenConfirmTeamPlayers: false,
    isOpenConfirmTeams: false,
    isOpenMobileFirstPage: false,
    isOpenLeaveEvent: false,
    isOpenUnAuthJoin: false,
    isOpenEndGame: false,
    isOpenUpdatePassword: false,
    isOpenShowEmblem: false,
    isOpenShowMenu: false,
    isOpenDeleteAccount: false,
    isOpenOnboardingStep1: false,
    isOpenOnboardingStep2: false,
    isOpenOnboardingStep3: false,
}

export const windows = (state = initialState, action) => {
  switch (action.type) {
      case SIGN_UP_WINDOW:
          return {
              ...state,
              isOpenSignUp: action.value
          };
      case LOGIN_WINDOW:
          return {
              ...state,
              isOpenLogin: action.value
          };
      case REFRESH_PASSWORD_WINDOW:
          return {
              ...state,
              isOpenRefreshPassword: action.value
          };
      case SUCCESS_REFRESH_PASSWORD_WINDOW:
          return {
              ...state,
              isOpenSuccessRefreshPassword: action.value
          };
      case SUCCESS_SIGN_UP_WINDOW:
          return {
              ...state,
              isOpenSuccessSignUp: action.value
          };
      case SUCCESS_SIGN_UP2_WINDOW:
          return {
              ...state,
              isOpenSuccessSignUp2: action.value
          };
      case SUCCESS_CREATE_EVENT_WINDOW:
          return {
              ...state,
              isOpenSuccessCreateEvent: action.value
          };
      case SUCCESS_EDIT_EVENT_WINDOW:
          return {
              ...state,
              isOpenSuccessEditEvent: action.value
          };
      case SUCCESS_CANCEL_EVENT_WINDOW:
          return {
              ...state,
              isOpenSuccessCancelEvent: action.value
          };
      case SUCCESS_UPDATE_USER_WINDOW:
          return {
              ...state,
              isOpenSuccessUpdateUser: action.value
          };
      case SUCCESS_UPDATE_PASSWORD_WINDOW:
          return {
              ...state,
              isOpenSuccessUpdatePassword: action.value
          };
      case SUCCESS_EXISTS_USER_WINDOW:
          return {
              ...state,
              isOpenSuccessExistsUser: action.value
          };
      case REPEAT_EVENT_WINDOW:
          return {
              ...state,
              isOpenRepeatEvent: action.value
          };
      case CHOICE_CITY_WINDOW:
          return {
              ...state,
              isOpenChoiceCity: action.value
          };
      case CREATE_EVENT_WINDOW:
          return {
              ...state,
              isOpenCreateEvent: action.value
          };
      case CREATE_EVENT_UN_AUTH_WINDOW:
          return {
              ...state,
              isOpenCreateEventUnAuth: action.value
          };
      case EDIT_EVENT_WINDOW:
          return {
              ...state,
              isOpenEditEvent: action.value
          };
      case CANCEL_EVENT_WINDOW:
          return {
              ...state,
              isOpenCancelEvent: action.value
          };
      case CONFIRM_PLAYERS_WINDOW:
          return {
              ...state,
              isOpenConfirmPlayers: action.value
          };
      case FILL_REGULATION_WINDOW:
          return {
              ...state,
              isOpenFillRegulation: action.value
          };
      case CONFIRM_TEAM_PLAYERS_WINDOW:
          return {
              ...state,
              isOpenConfirmTeamPlayers: action.value
          };
      case CONFIRM_TEAMS_WINDOW:
          return {
              ...state,
              isOpenConfirmTeams: action.value
          };
      case MOBILE_FIRST_PAGE_WINDOW:
          return {
              ...state,
              isOpenMobileFirstPage: action.value
          };
      case LEAVE_EVENT_WINDOW:
          return {
              ...state,
              isOpenLeaveEvent: action.value
          };
      case UN_AUTH_JOIN_WINDOW:
          return {
              ...state,
              isOpenUnAuthJoin: action.value
          };
      case END_GAME_WINDOW:
          return {
              ...state,
              isOpenEndGame: action.value
          };
      case UPDATE_PASSWORD_WINDOW:
          return {
              ...state,
              isOpenUpdatePassword: action.value
          };
      case SHOW_EMBLEM_WINDOW:
          return {
              ...state,
              isOpenShowEmblem: action.value
          };
      case SHOW_MENU_WINDOW:
          return {
              ...state,
              isOpenShowMenu: action.value
          };
      case DELETE_ACCOUNT_WINDOW:
          return {
              ...state,
              isOpenDeleteAccount: action.value
          };
      case ONBOARDING_STEP_1_WINDOW:
          return {
              ...state,
              isOpenOnboardingStep1: action.value
          };
      case ONBOARDING_STEP_2_WINDOW:
          return {
              ...state,
              isOpenOnboardingStep2: action.value
          };
      case ONBOARDING_STEP_3_WINDOW:
          return {
              ...state,
              isOpenOnboardingStep3: action.value
          };
      default:
          return state;
  }
};
