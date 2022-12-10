import {hiddenMap, successRefreshPasswordWindow} from "../actions/actions";
import {connect} from "react-redux";
import SuccessRefreshPasswordComponent from "../../components/success/SuccessRefreshPasswordComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessRefreshPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successRefreshPasswordWindow(false));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};


const VisibleSuccessRefreshPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessRefreshPasswordComponent);



export default VisibleSuccessRefreshPassword;