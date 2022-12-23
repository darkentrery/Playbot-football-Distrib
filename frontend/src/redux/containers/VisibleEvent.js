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
  sameEvents
} from "../actions/actions";
import {connect} from "react-redux";
import EventComponent from "../../components/body/EventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    sameEvents: state.event.sameEvents,
    user: state.user,
    // steps: state.event.steps,
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
      setSameEvents: (value) => {
        dispatch(sameEvents(value));
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
    }
  };
};

const VisibleEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventComponent);

export default VisibleEvent;