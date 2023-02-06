import {createEventUnAuthWindow, loginWindow, signUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import CreateEventUnAuthComponent from "../../components/popups/createEventUnAuthComponent/CreateEventUnAuthComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenCreateEventUnAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(createEventUnAuthWindow(false));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
    openSignUp: () => {
      dispatch(signUpWindow(true));
    },
  };
};

const VisibleCreateEventUnAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventUnAuthComponent);


export default VisibleCreateEventUnAuth;