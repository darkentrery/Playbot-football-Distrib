import {cancelEventWindow, event, hiddenMap, successCancelEventWindow} from "../actions/actions";
import {connect} from "react-redux";
import {CancelEventComponent} from "../../components/popups/CancelEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenCancelEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcs: {
      closeComponent: () => {
        dispatch(cancelEventWindow(false));
      },
      openSuccessCancelEvent: () => {
        dispatch(successCancelEventWindow(true));
      },
      setEvent: (value) => {
        dispatch(event(value));
      },
      showMap: () => {
        dispatch(hiddenMap(false));
      },
      removeMap: () => {
        dispatch(hiddenMap(true));
      },
    }
  };
};

const VisibleCancelEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelEventComponent);

export default VisibleCancelEvent;