import {
    EVENT,
    GAME,
    HIDDEN_MAP,
    PLAYER,
    PLAYER_BLOCK,
    PLAYERS,
    SAME_EVENTS, SEND_SOCKET_MESSAGE,
    STEPS,
    TEAM
} from "../actions/actions";

const initialEventState = {
    event: false,
    players: [],
    player: false,
    steps: [],
    hiddenMap: false,
    team: false,
    sameEvents: [],
    game: false,
    playerBlock: true,
    sendSocketMessage: false,
}

export const event = (state = initialEventState, action) => {
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
      case PLAYER_BLOCK:
          return {
              ...state,
              playerBlock: action.value,
          };
      case SEND_SOCKET_MESSAGE:
          return {
              ...state,
              sendSocketMessage: action.value,
          };
      default:
          return state;
  }
};