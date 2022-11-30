import {connect} from "react-redux";
import App from "../../App";
import {signUpWindow} from "../actions/actions";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpenSignUp: state.windows.isOpenSignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSignUp: () => {
      dispatch(signUpWindow(true));
    },
  };
};


const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default VisibleApp;