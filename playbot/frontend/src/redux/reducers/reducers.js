import {
    AUTH,
    CHOICE_CITY_WINDOW,
    LOGIN_WINDOW,
    REFRESH_PASSWORD_WINDOW,
    SIGN_UP_WINDOW, SUCCESS_CREATE_EVENT_WINDOW, SUCCESS_EDIT_EVENT_WINDOW,
    SUCCESS_REFRESH_PASSWORD_WINDOW, SUCCESS_SIGN_UP2_WINDOW, SUCCESS_SIGN_UP_WINDOW
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
    isOpenChoiceCity: false,
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
      case CHOICE_CITY_WINDOW:
          return {
              ...state,
              isOpenChoiceCity: action.value
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

export let rootReducer = combineReducers({
    windows,
    user,
});






