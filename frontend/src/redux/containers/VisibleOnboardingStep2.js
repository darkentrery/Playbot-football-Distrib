import {auth, onboardingStep1Window, onboardingStep2Window} from "../actions/actions";
import {connect} from "react-redux";
import {OnboardingStep2Component} from "../../components/popups/onboardingStep2Component/OnboardingStep2Component";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenOnboardingStep2,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(onboardingStep2Window(false));
      },
      setAuth: (value, user) => {
        dispatch(auth(value, user));
      },
      openOnboardingStep1: () => {
        dispatch(onboardingStep1Window(true));
      },
    }
  };
};

const VisibleOnboardingStep2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingStep2Component);

export default VisibleOnboardingStep2;