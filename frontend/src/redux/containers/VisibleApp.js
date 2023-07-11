import {connect} from "react-redux";
import App from "../../App";
import {
  choiceCityWindow,
  signUpWindow,
  successSignUp2Window,
  auth,
  fillRegulationWindow,
  confirmPlayersWindow,
  event,
  steps,
  confirmTeamsWindow,
  players,
  mobileFirstPageWindow,
  loginWindow,
  iphone,
  hiddenMap,
  team,
  confirmTeamPlayersWindow,
  successExistsUserWindow,
  onboardingStep1Window,
  onboardingStep2Window,
  onboardingStep3Window, telegramApp
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
      openSuccessExistsUser: () => {
        dispatch(successExistsUserWindow(true));
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
      setIsIPhone: (value) => {
        dispatch(iphone(value));
      },
      setIsTelegramApp: (value) => {
        dispatch(telegramApp(value));
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
      openOnboardingStep1: () => {
        dispatch(onboardingStep1Window(true));
      },
      closeOnboardingStep1: () => {
        dispatch(onboardingStep1Window(false));
      },
      openOnboardingStep2: () => {
        dispatch(onboardingStep2Window(true));
      },
      closeOnboardingStep2: () => {
        dispatch(onboardingStep2Window(false));
      },
      openOnboardingStep3: () => {
        dispatch(onboardingStep3Window(true));
      },
      closeOnboardingStep3: () => {
        dispatch(onboardingStep3Window(false));
      }
    }
  };
};


const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;