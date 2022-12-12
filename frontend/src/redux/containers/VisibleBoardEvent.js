import {
  event,
  editEventWindow,
  cancelEventWindow,
  confirmPlayersWindow,
  players,
  steps,
  fillRegulationWindow,
  confirmTeamsWindow,
  hiddenMap,
  leaveEventWindow,
  loginWindow, unAuthJoinWindow
} from "../actions/actions";
import {connect} from "react-redux";
import BoardEventComponent from "../../components/body/BoardEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    event: state.event.event,
    user: state.user,
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
      setPlayers: (value) => {
        dispatch(players(value));
      },
      setSteps: (value) => {
        dispatch(steps(value));
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
      openLeaveEvent: () => {
        dispatch(leaveEventWindow(true));
      },
      openUnAuthJoin: () => {
        dispatch(unAuthJoinWindow(true));
      },
    }
  };
};

const VisibleBoardEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardEventComponent);

export default VisibleBoardEvent;