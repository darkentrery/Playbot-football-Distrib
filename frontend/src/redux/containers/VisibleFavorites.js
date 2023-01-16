import {connect} from "react-redux";
import {
  auth,
  choiceCityWindow, confirmPlayersWindow, confirmTeamPlayersWindow, confirmTeamsWindow,
  event, fillRegulationWindow,
  hiddenMap, iphone,
  loginWindow, mobileFirstPageWindow, player, players,
  signUpWindow, steps,
  successSignUp2Window, team
} from "../actions/actions";
import {ProfileFavoritesComponent} from "../../components/pages/profileFavoritesComponent/ProfileFavoritesComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    player: state.event.player,
    user: state.event.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      openSignUp: () => {
        dispatch(signUpWindow(true));
      },
      openLogin: () => {
        dispatch(loginWindow(true));
      },
      openSuccessSignUp2: () => {
        dispatch(successSignUp2Window(true));
      },
      openChoiceCity: () => {
        dispatch(choiceCityWindow(true));
      },
      setAuth: (value, user) => {
        dispatch(auth(value, user));
      },
      setEvent: (value) => {
        dispatch(event(value));
      },
      setSteps: (value) => {
        dispatch(steps(value));
      },
      setTeam: (value) => {
        dispatch(team(value));
      },
      setPlayers: (value) => {
        dispatch(players(value));
      },
      setPlayer: (value) => {
        dispatch(player(value));
      },
      setIsIPhone: (value) => {
        dispatch(iphone(value));
      },
      openFillRegulation: () => {
        dispatch(fillRegulationWindow(true));
      },
      closeFillRegulation: () => {
        dispatch(fillRegulationWindow(false));
      },
      openConfirmPlayers: () => {
        dispatch(confirmPlayersWindow(true));
      },
      closeConfirmPlayers: () => {
        dispatch(confirmPlayersWindow(false));
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
      closeConfirmTeams: () => {
        dispatch(confirmTeamsWindow(false));
      },
      openMobileFirstPage: () => {
        dispatch(mobileFirstPageWindow(true));
      },
      closeMobileFirstPage: () => {
        dispatch(mobileFirstPageWindow(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
      showMap: () => {
        dispatch(hiddenMap(false));
      },
    },
  };
};


const VisibleFavorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFavoritesComponent);

export default VisibleFavorites;