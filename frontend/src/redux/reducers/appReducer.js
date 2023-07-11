import {IPHONE, TELEGRAM_APP} from "../actions/actions";

const initialAppState = {
    isIPhone: false,
    isTelegramApp: false,
}

export const app = (state = initialAppState, action) => {
  switch (action.type) {
      case IPHONE:
          return {
              ...state,
              isIPhone: action.value,
          };
      case TELEGRAM_APP:
          return {
              ...state,
              isTelegramApp: action.value,
          };
      default:
          return state;
  }
};