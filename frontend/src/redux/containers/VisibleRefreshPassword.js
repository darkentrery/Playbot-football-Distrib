import {hiddenMap, loginWindow, refreshPasswordWindow, successRefreshPasswordWindow} from "../actions/actions";
import {connect} from "react-redux";
import RefreshPasswordComponent from "../../components/RefreshPasswordComponent";



const mapStateToProps = (state) => {
  return {
    // ...state,
    isOpen: state.windows.isOpenRefreshPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(refreshPasswordWindow(false));
    },
    openSuccess: () => {
      dispatch(successRefreshPasswordWindow(true));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};

const VisibleRefreshPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(RefreshPasswordComponent);


export default VisibleRefreshPassword;