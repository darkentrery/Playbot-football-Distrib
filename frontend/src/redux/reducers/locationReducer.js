import {CITY, COUNTRY} from "../actions/actions";

const initialLocationState = {
    city: "Tbilisi",
    country: "Россия",
}

export const location = (state = initialLocationState, action) => {
  switch (action.type) {
      case CITY:
          return {
              ...state,
              city: action.value,
          };
      case COUNTRY:
          return {
              ...state,
              country: action.value,
          };
      default:
          return state;
  }
};