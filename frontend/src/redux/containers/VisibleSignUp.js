import {hiddenMap, loginWindow, signUpWindow, successSignUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import SignUpComponent from "../../components/SignUpComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSignUp,
    isIPhone: state.app.isIPhone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(signUpWindow(false));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
    openSuccessSignUp: () => {
      dispatch(successSignUpWindow(true));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};

const VisibleSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);


export default VisibleSignUp;