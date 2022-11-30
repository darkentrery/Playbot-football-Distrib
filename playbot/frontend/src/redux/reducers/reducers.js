import {LOGIN_WINDOW, REFRESH_PASSWORD_WINDOW, SIGN_UP_WINDOW} from "../actions/actions";
import { combineReducers } from 'redux';

const initialState = {
    isOpenSignUp: false,
    isOpenLogin: false,
    isOpenRefreshPassword: false,
}


const windows = (state = initialState, action) => {
  switch (action.type) {
      case SIGN_UP_WINDOW:
          return {isOpenSignUp: action.value};
      case LOGIN_WINDOW:
          return {isOpenLogin: action.value};
      case REFRESH_PASSWORD_WINDOW:
          return {isOpenRefreshPassword: action.value}
      default:
          return state;
  }
};

export let rootReducer = combineReducers({
  windows,
});






