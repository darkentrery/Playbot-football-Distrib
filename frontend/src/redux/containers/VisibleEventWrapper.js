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
  endGameWindow
} from "../actions/actions";
import {connect} from "react-redux";
import {EventWrapperComponent} from "../../components/wrappers/eventWrapperComponent/EventWrapperComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    user: state.user,
    game: state.event.game,
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
    }
  };
};

const VisibleEventWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventWrapperComponent);

export default VisibleEventWrapper;