import {deleteAccountWindow} from "../actions/actions";
import {connect} from "react-redux";
import {DeleteAccountComponent} from "../../components/popups/DeleteAccountComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenDeleteAccount,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(deleteAccountWindow(false));
    },
  };
};

const VisibleDeleteAccount= connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccountComponent);

export default VisibleDeleteAccount;