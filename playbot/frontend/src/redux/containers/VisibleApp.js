import {connect} from "react-redux";
import App from "../../App";
import {
  choiceCityWindow,
  signUpWindow,
  successSignUp2Window,
  auth,
  fillRegulationWindow,
  confirmPlayersWindow, event, steps, confirmTeamsWindow, players, mobileFirstPageWindow, loginWindow, iphone
} from "../actions/actions";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpenSignUp: state.windows.isOpenSignUp,
    state: state,
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
      setPlayers: (value) => {
        dispatch(players(value));
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
    }
  };
};


const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;