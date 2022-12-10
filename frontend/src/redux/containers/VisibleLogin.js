import {loginWindow, refreshPasswordWindow, signUpWindow, auth} from "../actions/actions";
import {connect} from "react-redux";
import LoginComponent from "../../components/LoginComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(loginWindow(false));
    },
    openSignUp: () => {
      dispatch(signUpWindow(true));
    },
    openRefreshPassword: () => {
      dispatch(refreshPasswordWindow(true));
    },
    setAuth: (value, user) => {
      dispatch(auth(value, user));
    },
  };
};


const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);



export default VisibleLogin;