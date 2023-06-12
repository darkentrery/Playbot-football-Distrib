import {
    event,
    editEventWindow,
    cancelEventWindow,
    confirmPlayersWindow,
    players,
    auth,
    steps,
    fillRegulationWindow,
    confirmTeamsWindow,
    hiddenMap,
    leaveEventWindow,
    unAuthJoinWindow, confirmTeamPlayersWindow, repeatEventWindow
} from "../actions/actions";
import {connect} from "react-redux";
import EventJoinWithInfoCards from "../../components/EventJoinWithInfoCards/EventJoinWithInfoCards";
  
  
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
        openRepeatEvent: () => {
          dispatch(repeatEventWindow(true));
        },
        setAuth: (value, user) => {
          dispatch(auth(value, user));
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
        openConfirmTeamPlayers: () => {
          dispatch(confirmTeamPlayersWindow(true));
        },
        closeConfirmTeamPlayers: () => {
          dispatch(confirmTeamPlayersWindow(false));
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
  
  const VisibleJoinWithInfoCards = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventJoinWithInfoCards);
  
  export default VisibleJoinWithInfoCards;