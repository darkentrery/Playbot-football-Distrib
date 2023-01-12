import {hiddenMap, successCancelEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import {SuccessCancelEventComponent} from "../../components/success/SuccessCancelEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenSuccessCancelEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(successCancelEventWindow(false));
    },
    showMap: () => {
      dispatch(hiddenMap(false));
    },

  };
};

const VisibleSuccessCancelEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessCancelEventComponent);

export default VisibleSuccessCancelEvent;