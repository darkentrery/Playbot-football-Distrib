import {hiddenMap, successSignUpWindow} from "../actions/actions";
import {connect} from "react-redux";
import SuccessSignUpComponent from "../../components/success/SuccessSignUpComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessSignUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successSignUpWindow(false));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};


const VisibleSuccessSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessSignUpComponent);



export default VisibleSuccessSignUp;