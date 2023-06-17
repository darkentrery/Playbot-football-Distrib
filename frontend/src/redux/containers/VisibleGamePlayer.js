import {
  event,
  editEventWindow,
  cancelEventWindow,
  confirmPlayersWindow,
  players,
  steps,
  fillRegulationWindow,
  confirmTeamsWindow,
  loginWindow,
  hiddenMap,
  team,
  endGameWindow, game, playerBlock, sendSocketMessage
} from "../actions/actions";
import {connect} from "react-redux";
import {GamePlayerComponent} from "../../components/pages/gamePlayerComponent/GamePlayerComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    user: state.user,
    game: state.event.game,
    playerBlock: state.event.playerBlock,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      openEditEvent: () => {
        dispatch(editEventWindow(true));
      },
      setEvent: (value) => {
        dispatch(event(value));
      },
      setTeam: (value) => {
        dispatch(team(value));
      },
      setPlayers: (value) => {
        dispatch(players(value));
      },
      setSteps: (value) => {
        dispatch(steps(value));
      },
      setGame: (value) => {
        dispatch(game(value));
      },
      openLogin: () => {
        dispatch(loginWindow(true));
      },
      openCancelEvent: () => {
        dispatch(cancelEventWindow(true));
      },
      openConfirmPlayers: () => {
        dispatch(confirmPlayersWindow(true));
      },
      openFillRegulation: () => {
        dispatch(fillRegulationWindow(true));
      },
      openConfirmTeams: () => {
        dispatch(confirmTeamsWindow(true));
      },
      showMap: () => {
        dispatch(hiddenMap(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
      openEndGame: () => {
        dispatch(endGameWindow(true));
      },
      setPlayerBlock: (value) => {
        dispatch(playerBlock(value));
      },
      setSendSocketMessage: (value) => {
        dispatch(sendSocketMessage(value));
      },
    }
  };
};

const VisibleGamePlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlayerComponent);

export default VisibleGamePlayer;