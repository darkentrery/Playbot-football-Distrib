import {hiddenMap, loginWindow, unAuthJoinWindow} from "../actions/actions";
import {connect} from "react-redux";
import {UnAuthJoinComponent} from "../../components/popups/UnAuthJoinComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenUnAuthJoin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(unAuthJoinWindow(false));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
    removeMap: () => {
      dispatch(hiddenMap(true));
    },
    openLogin: () => {
      dispatch(loginWindow(true));
    },
  };
};

const VisibleUnAuthJoin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnAuthJoinComponent);

export default VisibleUnAuthJoin;