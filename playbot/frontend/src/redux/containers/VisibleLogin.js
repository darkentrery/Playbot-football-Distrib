import {loginWindow, refreshPasswordWindow, signUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import LoginComponent from "../../components/LoginComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpenLogin: state.windows.isOpenLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSignUp: () => {
      dispatch(signUpWindow(true));
    },
    closeLogin: () => {
      dispatch(loginWindow(false));
    },
    openRefreshPassword: () => {
      dispatch(refreshPasswordWindow(true));
    },
  };
};


const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);



export default VisibleLogin;