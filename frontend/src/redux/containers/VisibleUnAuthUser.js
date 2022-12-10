import {hiddenMap, loginWindow} from "../actions/actions";
import {connect} from "react-redux";
import UnAuthUserComponent from "../../components/head/UnAuthUserComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => {
      dispatch(loginWindow(true));
    },
    removeMap: () => {
      dispatch(hiddenMap(true));
    },
  };
};

const VisibleUnAuthUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnAuthUserComponent);


export default VisibleUnAuthUser;