import {cancelEventWindow, event} from "../actions/actions";
import {connect} from "react-redux";
import CancelEventComponent from "../../components/popups/CancelEventComponent";


const mapStateToProps = (state) => {
  return {
    ...state,
    isOpen: state.windows.isOpenCancelEvent,
    event: state.event.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeComponent: () => {
      dispatch(cancelEventWindow(false));
    },
    setEvent: (value) => {
      dispatch(event(value));
    },
  };
};

const VisibleCancelEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelEventComponent);

export default VisibleCancelEvent;