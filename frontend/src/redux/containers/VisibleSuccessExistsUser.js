import {hiddenMap, successExistsUserWindow} from "../actions/actions";
import {connect} from "react-redux";
import {SuccessExistsUserComponent} from "../../components/success/SuccessExistsUserComponent";



const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessExistsUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successExistsUserWindow(false));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },
  };
};


const VisibleSuccessExistsUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessExistsUserComponent);



export default VisibleSuccessExistsUser;