import {loginWindow, signUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import SignUpComponent from "../../components/SignUpComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpenSignUp: state.windows.isOpenSignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSignUp: () => {
      dispatch(signUpWindow(false));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
  };
};


const VisibleSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);



export default VisibleSignUp;