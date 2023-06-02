import {AUTH} from "../actions/actions";

const initialAuthState = {
    isAuth: null,
    user: false,
}

export const user = (state = initialAuthState, action) => {
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