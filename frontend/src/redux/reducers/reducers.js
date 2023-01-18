import {
    AUTH,
    CANCEL_EVENT_WINDOW,
    CHOICE_CITY_WINDOW,
    CITY,
    CONFIRM_PLAYERS_WINDOW,
    CONFIRM_TEAM_PLAYERS_WINDOW,
    CONFIRM_TEAMS_WINDOW,
    CREATE_EVENT_UN_AUTH_WINDOW,
    CREATE_EVENT_WINDOW,
    EDIT_EVENT_WINDOW,
    END_GAME_WINDOW,
    EVENT,
    FILL_REGULATION_WINDOW,
    GAME,
    HIDDEN_MAP,
    IPHONE,
    LEAVE_EVENT_WINDOW,
    LOGIN_WINDOW,
    MOBILE_FIRST_PAGE_WINDOW,
    PLAYER,
    PLAYERS,
    REFRESH_PASSWORD_WINDOW,
    REPEAT_EVENT_WINDOW,
    SAME_EVENTS,
    SIGN_UP_WINDOW,
    STEPS,
    SUCCESS_CANCEL_EVENT_WINDOW,
    SUCCESS_CREATE_EVENT_WINDOW,
    SUCCESS_EDIT_EVENT_WINDOW,
    SUCCESS_REFRESH_PASSWORD_WINDOW,
    SUCCESS_SIGN_UP2_WINDOW,
    SUCCESS_SIGN_UP_WINDOW,
    SUCCESS_UPDATE_PASSWORD_WINDOW,
    SUCCESS_UPDATE_USER_WINDOW,
    TEAM,
    UN_AUTH_JOIN_WINDOW,
    UPDATE_PASSWORD_WINDOW
} from "../actions/actions";
import { combineReducers } from 'redux';

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
}


const windows = (state = initialState, action) => {
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
      default:
          return state;
  }
};

const initialAuthState = {
    isAuth: false,
    user: false,
}

const user = (state = initialAuthState, action) => {
  switch (action.type) {
      case AUTH:
          return {
              ...state,
              isAuth: action.value,
              user: action.user,
          };
      default:
          return state;
  }
};

const initialEventState = {
    event: false,
    players: [],
    player: false,
    steps: [],
    hiddenMap: false,
    team: false,
    sameEvents: [],
    game: false,
}

const event = (state = initialEventState, action) => {
  switch (action.type) {
      case EVENT:
          return {
              ...state,
              event: action.value,
          };
      case PLAYERS:
          return {
              ...state,
              players: action.value,
          };
      case PLAYER:
          return {
              ...state,
              player: action.value,
          };
      case STEPS:
          return {
              ...state,
              steps: action.value,
          };
      case TEAM:
          return {
              ...state,
              team: action.value,
          };
      case GAME:
          return {
              ...state,
              game: action.value,
          };
      case HIDDEN_MAP:
          return {
              ...state,
              hiddenMap: action.value,
          };
      case SAME_EVENTS:
          return {
              ...state,
              sameEvents: action.value,
          };
      default:
          return state;
  }
};

const initialLocationState = {
    city: "Москва",
}

const location = (state = initialLocationState, action) => {
  switch (action.type) {
      case CITY:
          return {
              ...state,
              city: action.value,
          };
      default:
          return state;
  }
};

const initialAppState = {
    isIPhone: false,
}

const app = (state = initialAppState, action) => {
  switch (action.type) {
      case IPHONE:
          return {
              ...state,
              isIPhone: action.value,
          };
      default:
          return state;
  }
};

export let rootReducer = combineReducers({
    windows,
    user,
    event,
    location,
    app,
});






