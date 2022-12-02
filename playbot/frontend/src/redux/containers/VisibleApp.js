import {connect} from "react-redux";
import App from "../../App";
import {
  choiceCityWindow,
  signUpWindow,
  successSignUp2Window,
  auth,
  fillRegulationWindow,
  confirmPlayersWindow
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
      openSuccessSignUp2: () => {
        dispatch(successSignUp2Window(true));
      },
      openChoiceCity: () => {
        dispatch(choiceCityWindow(true));
      },
      setAuth: (value, user) => {
        dispatch(auth(value, user));
      },
      closeFillRegulation: () => {
        dispatch(fillRegulationWindow(false));
      },
      openConfirmPlayers: () => {
        dispatch(confirmPlayersWindow(true));
      },
    }
  };
};


const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;