import {loginWindow, refreshPasswordWindow, signUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import RefreshPasswordComponent from "../../components/RefreshPasswordComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpenRefreshPassword: state.windows.isOpenRefreshPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSignUp: () => {
      dispatch(signUpWindow(true));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
    closeRefreshPassword: () => {
      dispatch(refreshPasswordWindow(false));
    },
  };
};


const VisibleRefreshPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshPasswordComponent);



export default VisibleRefreshPassword;