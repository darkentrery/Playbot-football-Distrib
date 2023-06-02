import {IPHONE} from "../actions/actions";

const initialAppState = {
    isIPhone: false,
}

export const app = (state = initialAppState, action) => {
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