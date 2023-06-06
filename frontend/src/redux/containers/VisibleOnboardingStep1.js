import {onboardingStep1Window} from "../actions/actions";
import {connect} from "react-redux";
import {OnboardingStep1Component} from "../../components/popups/onboardingStep1Component/OnboardingStep1Component";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenOnboardingStep1,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(onboardingStep1Window(false));
    }
  };
};

const VisibleOnboardingStep1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingStep1Component);

export default VisibleOnboardingStep1;