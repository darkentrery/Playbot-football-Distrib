import {
  event,
  editEventWindow,
  cancelEventWindow,
  confirmPlayersWindow, players, steps, fillRegulationWindow, confirmTeamsWindow, loginWindow, hiddenMap, team
} from "../actions/actions";
import {connect} from "react-redux";
import {TeamsInformationComponent} from "../../components/teamsInformationComponent/TeamsInformationComponent";


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

const VisibleTeamsInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsInformationComponent);

export default VisibleTeamsInformation;