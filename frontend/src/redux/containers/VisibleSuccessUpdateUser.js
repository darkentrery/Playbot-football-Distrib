import {successUpdateUserWindow} from "../actions/actions";
import {connect} from "react-redux";
import {SuccessUpdateUserComponent} from "../../components/success/SuccessUpdateUserComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessUpdateUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successUpdateUserWindow(false));
    },
  };
};

const VisibleSuccessUpdateUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessUpdateUserComponent);

export default VisibleSuccessUpdateUser;