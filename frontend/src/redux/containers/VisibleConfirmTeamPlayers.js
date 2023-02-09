import {connect} from "react-redux";
import {
    fillRegulationWindow,
    event,
    steps,
    confirmTeamsWindow,
    hiddenMap,
    team, confirmTeamPlayersWindow
} from "../actions/actions";
import {ConfirmTeamPlayersComponent} from "../../components/popups/confirmTeamPlayersComponent/ConfirmTeamPlayersComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenConfirmTeamPlayers,
    event: state.event.event,
    team: state.event.team,
    isIPhone: state.app.isIPhone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      setEvent: (value) => {
        dispatch(event(value));
      },
      setSteps: (value) => {
        dispatch(steps(value));
      },
      setTeam: (value) => {
        dispatch(team(value));
      },
      openFillRegulation: () => {
        dispatch(fillRegulationWindow(true));
      },
      closeFillRegulation: () => {
        dispatch(fillRegulationWindow(false));
      },
      openConfirmTeams: () => {
        dispatch(confirmTeamsWindow(true));
      },
      closeConfirmTeams: () => {
        dispatch(confirmTeamsWindow(false));
      },
      openConfirmTeamPlayers: () => {
        dispatch(confirmTeamPlayersWindow(true));
      },
      closeConfirmTeamPlayers: () => {
        dispatch(confirmTeamPlayersWindow(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
      showMap: () => {
        dispatch(hiddenMap(false));
      },
    }
  };
};


const VisibleConfirmTeamPlayers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmTeamPlayersComponent);

export default VisibleConfirmTeamPlayers;