import {successSignUp2Window} from "../actions/actions";
import {connect} from "react-redux";
import SuccessSignUp2Component from "../../components/success/SuccessSignUp2Component";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessSignUp2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successSignUp2Window(false));
    },
  };
};


const VisibleSuccessSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessSignUp2Component);



export default VisibleSuccessSignUp;