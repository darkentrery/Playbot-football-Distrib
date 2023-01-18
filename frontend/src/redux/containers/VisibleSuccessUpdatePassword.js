import {successUpdatePasswordWindow} from "../actions/actions";
import {connect} from "react-redux";
import {SuccessUpdatePasswordComponent} from "../../components/success/SuccessUpdatePasswordComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessUpdatePassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successUpdatePasswordWindow(false));
    },
  };
};


const VisibleSuccessUpdatePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessUpdatePasswordComponent);



export default VisibleSuccessUpdatePassword;