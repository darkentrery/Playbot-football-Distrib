import {
  player,
  successUpdatePasswordWindow,
  updatePasswordWindow
} from "../actions/actions";
import {connect} from "react-redux";
import {UpdatePasswordComponent} from "../../components/popups/updatePasswordComponent/UpdatePasswordComponent";



const mapStateToProps = (state) => {
  return {
    // ...state,
    isOpen: state.windows.isOpenUpdatePassword,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(updatePasswordWindow(false));
      },
      openSuccessUpdatePassword: () => {
        dispatch(successUpdatePasswordWindow(true));
      },
      setPlayer: (value) => {
        dispatch(player(value));
      },
    }
  };
};

const VisibleUpdatePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePasswordComponent);


export default VisibleUpdatePassword;